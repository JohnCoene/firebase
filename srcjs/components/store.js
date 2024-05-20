import {
  addDoc,
  doc,
  getFirestore,
  onSnapshot,
  query,
  setDoc,
  collection,
  where,
  or,
  greaterThan,
  orderBy,
} from "firebase/firestore";

const ww = where;

$(() => {
  let store;
  const unsubs = {};
  Shiny.addCustomMessageHandler("fireblaze-initialize-store", (msg) => {
    store = getFirestore(window.firebaseApp);
  });

  Shiny.addCustomMessageHandler("fireblaze-store-query", (msg) => {
    console.log(msg);
    const def = (snapshot) =>
      Shiny.setInputValue(
        `${msg.id}:raw`,
        snapshot.docs.map((doc) => doc.data()),
      );

    const custom = () => {};
    if (msg.cb) custom = eval(msg.cb);

    console.log(where);
    const q = query(
      collection(store, msg.collection),
      eval('ww("privacy", "==", "public")'),
    );

    if (msg.observe)
      unsubs[msg.id] = onSnapshot(q, (snapshot) => {
        def(snapshot);
        custom(snapshot);
      });
  });

  Shiny.addCustomMessageHandler("fireblaze-store-unsub", (msg) => {
    unsubs[msg.id]();
  });

  Shiny.addCustomMessageHandler("fireblaze-store-add", (msg) => {
    addDoc(collection(store, msg.collection), msg.data);
  });

  Shiny.addCustomMessageHandler("fireblaze-store-set", (msg) => {
    setDoc(doc(collection(store, msg.collection), msg.doc), msg.data);
  });

  Shiny.addCustomMessageHandler("fireblaze-store-on-snapshot", (msg) => {
    setDoc(doc(collection(store, msg.collection), msg.doc), msg.data);
  });
});
