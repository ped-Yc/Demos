const memoryStorage = {
  "1001": { name: "良品铺子" },
  "1002": { name: "来伊粉" },
  "1003": { name: "三只松鼠" },
  "1004": { name: "百草味" },
};

async function delay(ms = 200) {
  await new Promise((r) => setTimeout(r, ms));
}

class ShopService {
  async init() {
    await delay();
  }
  async find({ id, pageIndex = 0, pageSize = 10 }) {
    await delay();

    if (id) return [memoryStorage[id].filter(Boolean)];

    return Object.keys(memoryStorage)
      .slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)
      .map((id) => ({ id, ...memoryStorage[id] }));
  }
  async modify({ id, values }) {
    await delay();
    const target = memoryStorage[id];
    if (!target) return null;
    return Object.assign(target, values);
  }
}
