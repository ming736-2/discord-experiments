/**
 * @name Experiments
 * @author ming736
 * @version 1.0.0
 * @description Enables the experiments menus in User Settings
 */
let mod;
let usermod;
let nodes;
let oldGetUser;
class MyPlugin {
  constructor() {
  }

  start() {
    let wpRequire;
    window.webpackChunkdiscord_app.push([[ Math.random() ], {}, (req) => { wpRequire = req; }]);
    mod = Object.values(wpRequire.c).find(x => typeof x?.exports?.Z?.isDeveloper !== "undefined");
    usermod = Object.values(wpRequire.c).find(x => x?.exports?.default?.getUsers)
    nodes = Object.values(mod.exports.Z._dispatcher._actionHandlers._dependencyGraph.nodes)
    try {
        nodes.find(x => x.name == "ExperimentStore").actionHandler["OVERLAY_INITIALIZE"]({user: {flags: 1}})
    } catch (e) {}
    oldGetUser = usermod.exports.default.__proto__.getCurrentUser;
    usermod.exports.default.__proto__.getCurrentUser = () => ({isStaff: () => true})
    nodes.find(x => x.name == "DeveloperExperimentStore").actionHandler["CONNECTION_OPEN"]()
    usermod.exports.default.__proto__.getCurrentUser = oldGetUser
  }

  stop() {
    // Perform necessary cleanup or tear down of resources when the plugin is stopped
  }

  onLoad() {
    this.start();
  }

  onUnload() {
    this.stop();
  }
}

module.exports = MyPlugin;
