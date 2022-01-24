const { exec } = require('child_process');

const isPlainObject = (obj) => {
  if (!obj) return false;
  const proto = Object.getPrototypeOf(obj);
  return proto === null || (Object.getPrototypeOf(proto) === null && proto.constructor === obj.constructor);
};

// exec promised
function execp(cmd, opts = {}) {
  return new Promise((resolve, reject) => {
    const child = exec(cmd, opts, (err, stdout, stderr) => (err ? reject(err) : resolve({ stderr, stdout })));
    if (opts.stdout) child.stdout.pipe(opts.stdout);
    if (opts.stderr) child.stderr.pipe(opts.stderr);
  });
}

const execute = (opt, cb) => {
  const cmdArr = [
    `git log -1 --pretty=format:"%h,%H,%an,%ae,%ct,"`,
    `&& git rev-parse --abbrev-ref HEAD`,
    `&& git tag --contains HEAD`,
  ];
  const o = isPlainObject(opt) ? opt : {};
  return execp(cmdArr.join(''), o);
};

const lastCommit = (opt = {}, cb) => {
  return new Promise((resolve, reject) => {
    execute(opt).then(function ({ stderr, stdout }) {
      if (stderr) {
        cb && cb(stderr);
        return reject(stderr);
      }
      let a = stdout.split(',');
      const ob = {
        shortHash: a[0],
        hash: a[1],
        commitBy: { name: a[2], email: a[3] },
      };
      ob.committedOn = !isNaN(a[4]) ? Number(a[4]) : null;
      ob.branch = a[a.length - 1]
        .split('\n')
        .filter((v) => v)
        .join(',');
      cb && cb(stderr, ob);
      return resolve(ob);
    });
  });
};

/**
 * @example
 * lastCommit(null, (error, data) => { });
 * lastCommit().then(data => {})
 */
module.exports = lastCommit;
