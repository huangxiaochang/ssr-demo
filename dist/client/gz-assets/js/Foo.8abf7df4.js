import { f as defineComponent, m as createVNode, v as createTextVNode } from "./vendor.456977d6.js";
var foo = "";
const Foo = defineComponent({
  name: "Foo",
  setup() {
    return () => createVNode("div", {
      "class": "jsx"
    }, [createTextVNode("from JSX")]);
  }
});
export { Foo };
