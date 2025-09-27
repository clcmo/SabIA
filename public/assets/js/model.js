// model.js
export const ChatModel = {
  saveMessage: async (userMsg, botMsg) => {
    await db.collection("chat").add({
      user: userMsg,
      bot: botMsg,
      timestamp: new Date()
    });
  },
  getHistory: async () => {
    const snapshot = await db.collection("chat").orderBy("timestamp").get();
    return snapshot.docs.map(doc => doc.data());
  }
};
