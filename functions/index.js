'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// Cut off time. Child nodes older than this will be deleted.
const CUT_OFF_TIME = 60*1000; // 2 Hours in milliseconds.

/**
 * This database triggered function will check for child nodes that are older than the
 * cut-off time. Each child needs to have a `timestamp` attribute.
 */
exports.deleteOldItems = functions.database.ref('OrderDetail/{pushId}').onWrite(async (change) => {
  const ref = change.after.ref.parent; // reference to the parent
  const now = Date.now();
  const cutoff = now - CUT_OFF_TIME;
  const oldItemsQuery = ref.orderByChild('timestamp').endAt(cutoff);
  const snapshot = await oldItemsQuery.once('value');
  // create a map with all children that need to be removed
  const updates = {};
  snapshot.forEach(child => {
    updates[child.key] = null;
  });
  // execute all updates in one go and return the result to end the function
  return ref.update(updates);
});