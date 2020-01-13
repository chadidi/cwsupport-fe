module.exports = {
  apps: [{
    name: "cwsupport-staging",
    script: "npm",
    args: "run dev",
    watch: true,
    watch: ["server", "client"],
    // Delay between restart
    // watch_delay: 1000,
    ignore_watch: ["node_modules", "Tests"],
    watch_options: {
      followSymlinks: false
      // "usePolling": true
    }
  }]
};
