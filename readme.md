# Entity CLI

## Features

- support typeorm (ts), sequelize (ts) and mongoose (js, ts)
- Generate entity
- support OneToMany relation (typeorm, sequelize)
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

## How to use

for configuration go to [Configuration section](#configuration)

### Sequelize

- #### Typescript
  - Follow instructions for Install sequelize-typescript on [Sequelize-typescript homepage](https://www.npmjs.com/package/sequelize-typescript)

### typeorm

- #### Typescript
  - Follow instructions for Install typeorm on [Typeorm homepage](https://www.npmjs.com/package/typeorm)

### Mongoose

- #### Typescript / Javascript
  - Follow instructions for Install mongoose on [Mongoose homepage](https://www.npmjs.com/package/mongoose)

## <a id="configuration">Configuration</a>

create an `entity-cli.json` file in your project root directory

put this content

```
{
  "src": "put_entities_directory",
  "orm": "type" //typeorm or mongoose or sequelize,
  "lang": "language" // js or ts
}
```

### Module mode (recommended for nestJs users)

#### What's module mode ?

a module is a directory that encompasses the logics that revolve around a well-defined entity
it permits to organize the application structure.

#### how to activate ?

add `"mode": "module"` to entity-cli.json

add `"modulesDir": "path to module dir"` to change the modules directory

when the module mode is activate, the src key in entity-cli.json represents the folder where are entities inside the module

```
{
  "mode": "module",
  "modulesDir": "path to module dir"
}
```

the default directory is : src/entities

default orm : typeorm

default language : ts

default modules directory : src/modules
