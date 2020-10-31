# Entity CLI

## Features

- support typeorm (ts) and mongoose (js, ts)
- Generate entity
- support OneToMany relation (typeorm)
- support OneToOne relation (typeorm)
- support string, number, boolean type
- support config file

## How to install

#### Add to scripts key to package.json

```
"scripts" {
    ...
    "entity-cli": "babel-node ./node_modules/entity-cli/index.mjs"
}
```

## How to install (typeORM)

#### Install typeORM globally

`npm i -g typeorm`
or
`yarn global add typeorm`

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

the default directory is : src/entities
default orm : typeorm
default language : ts
