# Entity CLI

## Features

- support typeorm (ts) and mongoose (js, ts)
- Generate entity
- support OneToMany relation (typeorm)
- support OneToOne relation (typeorm)
- support string, number, boolean type
- additionally supports Buffer, ObjectId type for mongoose
- support config file
- mode module

## How to install

`npm i entity-cli` or `yarn add entity-cli`

#### Add to scripts key to package.json

```
"scripts" {
    ...
    "entity-cli": "node ./node_modules/entity-cli/index.js"
}
```

## Configuration

create an `entity-cli.json` file in your project root directory

put this content

```
{
  "src": "put_entities_directory",
  "orm": "type" //typeorm or mongoose,
  "lang": "language" // js or ts
}
```

### Module mode (recommended for nestJs users)

#### What's module mode ?

a module is a directory that encompasses the logics that revolve around a well-defined entity
it permits to organize the application structure.

#### how to activate ?

add `"mode": "module"` to entity-cli.json

add `"moduleSrc": "path to module dir"` to change the modules directory

```
{
  "mode": "module",
  "moduleSrc": "path to module dir"
}
```

the default directory is : src/entities

default orm : typeorm

default language : ts

default modules directory : src/modules
