# MapperFactory

MapperFactory is a utility class for mapping JSON templates with dynamic data.

## Installation

```bash

npm install mapper-factory

import MapperFactory from 'mapper-factory';

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
