/*
 * Component Registry
 * Allow components to be registered so we can serve them to the brower
 */

const components = {};

function includeComponentTemplates() {
  return Object.keys(components).map(key => components[key].getTemplateElementAsString()).join('\n');
}

function includeComponentScripts(hasTemplate) {
  return `
    <script>
      ${Object.keys(components).map(key => components[key].getClassAsString(hasTemplate)).join('\n')}
    </script>
  `;
}

exports.includeComponents = () => {
  const template = includeComponentTemplates();
  return `${template}\n${includeComponentScripts(!!template)}`;
};

// Method for registering components
// This should not be used for pages
exports.registerComponent = (component) => {
  if (components[component.name]) throw Error(`component "${component.name}" has already been registered. Please change the components name`);
  components[component.name] = component;
};
