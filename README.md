
# MapperFactory

**MapperFactory** is a lightweight and powerful utility class for mapping JSON templates with dynamic data. It allows you to replace placeholders in a JSON structure (strings, arrays, objects) with actual values dynamically.

## Installation

Install `json-mapper-factory` using npm:

```bash
npm install json-mapper-factory
```

## Usage

Import and use `MapperFactory` to map dynamic data to JSON templates.

### Example 1: Basic Template Replacement

Replace placeholders in a simple JSON object:

```javascript
const MapperFactory = require('json-mapper-factory');

const template = {
  greeting: "Hello, {{name}}!",
  location: "{{city}}",
};

const data = {
  name: "Usama",
  city: "Lahore",
};

(async () => {
  const result = await MapperFactory.mappingJsonVariableKeyRecursively(template, data);
  console.log(result);
})();
// Output: { greeting: 'Hello, Usama!', location: 'Lahore' }
```

---

### Example 2: Nested JSON Templates

`MapperFactory` supports nested JSON structures. It recursively processes each level of the template:

```javascript
const template = {
  user: {
    name: "{{name}}",
    address: {
      city: "{{city}}",
      country: "{{country}}",
    },
  },
  message: "Welcome, {{name}}, from {{city}}!",
};

const data = {
  name: "Usama",
  city: "Lahore",
  country: "Pakistan",
};

(async () => {
  const result = await MapperFactory.mappingJsonVariableKeyRecursively(template, data);
  console.log(result);
})();
// Output:
// {
//   user: {
//     name: 'Usama',
//     address: { city: 'Lahore', country: 'Pakistan' }
//   },
//   message: 'Welcome, Usama, from Lahore!'
// }
```

---

### Example 3: Arrays in JSON Templates

`MapperFactory` can handle arrays and process each item independently:

```javascript
const template = {
  items: [
    "Item 1: {{item1}}",
    "Item 2: {{item2}}",
    "Total: {{total}}",
  ],
};

const data = {
  item1: "Apples",
  item2: "Oranges",
  total: "2 items",
};

(async () => {
  const result = await MapperFactory.mappingJsonVariableKeyRecursively(template, data);
  console.log(result);
})();
// Output:
// {
//   items: [ 'Item 1: Apples', 'Item 2: Oranges', 'Total: 2 items' ]
// }
```

---

### Example 4: Missing Placeholders Handling

If a placeholder doesn't exist in the data, the template retains the placeholder value:

```javascript
const template = {
  greeting: "Hello, {{name}}!",
  age: "Age: {{age}}",
};

const data = {
  name: "Usama",
};

(async () => {
  const result = await MapperFactory.mappingJsonVariableKeyRecursively(template, data);
  console.log(result);
})();
// Output: { greeting: 'Hello, Usama!', age: 'Age: {{age}}' }
```

---

## Features

1. **Recursive Mapping**: Automatically processes nested objects and arrays.
2. **Flexible Placeholders**: Works with `{{placeholder}}` syntax.
3. **Graceful Fallback**: Keeps placeholders intact if the corresponding key is not found.
4. **Lightweight**: Focused on simple JSON mapping without additional dependencies.

---

## API Reference

### `MapperFactory.mappingJsonVariableKeyRecursively(template, data)`

Recursively maps a JSON template by replacing placeholders with actual values from the `data` object.

#### Parameters:
- `template` (Object/Array/String): The JSON structure containing placeholders.
- `data` (Object): The object containing values to replace placeholders.

#### Returns:
- A `Promise` that resolves to the mapped JSON structure.

---

## Contributing

Contributions are welcome! If you find a bug or want to add a feature, feel free to open an issue or submit a pull request.

---

## License

This project is licensed under the [MIT License](LICENSE).
