import fs from "fs";

export const getTestConfig = async () => {
  const LITCONFIG = JSON.parse(
    await fs.promises.readFile(`${process.cwd()}/lit.config.json`, "utf8")
  );

  return LITCONFIG;
};
export const log = Object.assign(
  (...args) => {
    console.log("\x1b[90m", ...args, "\x1b[0m");
  },
  {
    green: (...args) => {
      console.log("\x1b[32m   ✓", "\x1b[90m", ...args, "\x1b[0m");
    },
    red: (...args) => {
      console.log("\x1b[31m   ✕", "\x1b[90m", ...args, "\x1b[0m");
    },
    blue: (...args) => {
      console.log("\x1b[34m   !", "\x1b[90m", ...args, "\x1b[0m");
    },
  }
);

export const testThese = async (tests) => {
  console.log(`Running ${tests.length} tests...\n`);

  for (const t of tests) {
    try {
      console.log(`${t.name}`);

      // calculate the time it takes to run the test
      const start = Date.now();
      const { status, message } = await t.fn();

      const end = Date.now();

      const time = end - start;

      if (status === 200) {
        log.green(`\t${message} (${time}ms)`);
      } else {
        log.red(`\t${message} (${time}ms)`);
      }

      console.log();
    } catch (e) {
      log.red(`\t${e.message}`);
    }
  }

  process.exit();
};
