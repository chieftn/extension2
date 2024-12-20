# extension2 README

This is the README for your extension "extension2". After writing up a brief description, we recommend including the following sections.

# Steps

1. Open repository in VSCode and click Terminal -> New Terminal.
1. Execute `npm install` from root folder.
1. Execute `npm run build` from root folder.
1. Change directory to /web.
1. Execute `npm install` from web folder.
1. Execute `npm run build` from web folder.
1. click Run -> Start debugging
1. In test environment create a file hello.dataflow.yaml.
1. Use the following notional graph format

```yaml
operators:
    - id: 0
      function: function1
      operator: Map
    - id: 1
      function: function2
      operator: Map
    - id: 2
      function: fuction3
      operator: Map
    - id: 3
      function: fuction3
      operator: Map
    - id: 4
      function: fuction3
      operator: Map
    - id: 5
      function: fuction3
      operator: Map
edges:
    - to: 908
      from: 0
      label: hello
    - to: 2
      from: 1
      label: world
    - to: 2
      from: 3
      label: world
    - to: 3
      from: 4
      label: world
    - to: 4
      from: 5
      label: world
```

1. Open the file in visual mode.
