import {
  primebus
} from "./chunk-47ILGSOC.js";
import "./chunk-5A4OAFVX.js";

// node_modules/primevue/toasteventbus/toasteventbus.esm.js
var ToastEventBus = primebus();

// node_modules/primevue/usetoast/usetoast.esm.js
var PrimeVueToastSymbol = Symbol();

// node_modules/primevue/toastservice/toastservice.esm.js
var ToastService = {
  install: function install(app) {
    var ToastService2 = {
      add: function add(message) {
        ToastEventBus.emit("add", message);
      },
      remove: function remove(message) {
        ToastEventBus.emit("remove", message);
      },
      removeGroup: function removeGroup(group) {
        ToastEventBus.emit("remove-group", group);
      },
      removeAllGroups: function removeAllGroups() {
        ToastEventBus.emit("remove-all-groups");
      }
    };
    app.config.globalProperties.$toast = ToastService2;
    app.provide(PrimeVueToastSymbol, ToastService2);
  }
};
export {
  ToastService as default
};
//# sourceMappingURL=primevue_toastservice.js.map
