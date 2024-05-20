import {
  addDoc,
  doc,
  getFirestore,
  onSnapshot,
  query,
  setDoc,
  collection,
  where as w,
  or as o,
  greaterThan as gt,
  orderBy as ob,
} from "firebase/firestore";

const where = w;
const or = o;
const greaterThan = gt;
const orderBy = ob;

$(() => {
  let store;
  const unsubs = {};
  Shiny.addCustomMessageHandler("fireblaze-initialize-store", (msg) => {
    store = getFirestore(window.firebaseApp);
  });

  Shiny.addCustomMessageHandler("fireblaze-store-query", (msg) => {
    const def = (snapshot) =>
      Shiny.setInputValue(
        `${msg.id}:raw`,
        snapshot.docs.map((doc) => doc.data()),
      );

    const custom = () => {};
    if (msg.cb) custom = eval(msg.cb);

    const q = query(
      collection(store, msg.collection),
      eval('where("privacy", "==", "public")'),
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
