# Entity CLI

## Features

- Generate entity
- support OneToMany relation
- support OneToOne relation
- support string, number, boolean type
- support config file

## How to install (typeORM)

#### Install typeORM globally

`npm i -g typeorm`
or
`yarn global add typeorm`

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
  "src": "put_entities_directory"
}
```

by default the directory is : src/entities
