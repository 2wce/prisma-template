<h1 align="center">
  Prisma Template
</h1>

![Release](https://github.com/2wce/prisma-template/actions/workflows/release.yml/badge.svg)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before we get started, we're going to need to make sure we have a few things installed and available on our machine.

#### Node >= 12

#### Docker

Use the installation guide from here:

https://www.docker.com/products/docker-desktop

##### MacOS

```bash
curl "https://nodejs.org/dist/latest/node-${VERSION:-$(wget -qO- https://nodejs.org/dist/latest/ | sed -nE 's|.*>node-(.*)\.pkg</a>.*|\1|p')}.pkg" > "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
```

##### Other

See the installation guides available @ nodejs.org:

https://nodejs.org/en/download/package-manager/

### Installing

Below is a series of step by step instructions that tell you how to get a development env running.

Create a local clone of the repository

```bash
git clone git@github.com:2wce/prisma-template.git
```

Enter the cloned repositories' directory

```bash
cd prisma-template
```

Create a `.env` file based on the [.env.example template](.env.example)

If you have a local MySQL database you can use it's details in the `.env` file. If not, you can run the docker container & use it's default values.

```bash
docker compose up -d
```

Export the contents of the created `.env` file to the current terminal session.

```bash
set -o allexport; source .env; set +o allexport
```

Install the projects dependencies

```bash
npm i
```

Start the projects development server

```bash
yarn dev
```

The project should now be available at http://localhost:4000

![graphql playground](https://i.imgur.com/h1xqghS.png)

Start the db viewer in another terminal to view your database

```bash
npx prisma studio
```

## Testing

You can run local tests using

```bash
yarn test
```

## Example Flow

You can find the example flow & queries in here: [ExampleFlow.md](ExampleFlow.md)

## Deployment

Deployments are handled by github actions, below is an overview of how the deployments work:

1. Dependencies are installed with `npm i`
2. Unit tests are run with `yarn test`

## Environment Variables

These are the environment variables required to successfully deploy the application.

| key          | description |
| ------------ | ----------- |
| DATABASE_URL | DB url      |

## Built With

Details of the tech stack that has been used.

- [Typescript](https://typescript.com/) - TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.
- [Prisma](https://www.prisma.io/) - Next-generation ORM
  for Node.js and TypeScript

## Versioning

This project uses [SemVer](http://semver.org/) for versioning. Versioning occurs automatically in the pipelines using [Semantic Release](https://github.com/semantic-release/semantic-release). For the versions available, see the tags on this repository.

## Changelog

A running changelog can be found here: [CHANGELOG.md](CHANGELOG.md)

## Authors

- **Kudakwashe Mupeni** <kudamupeni@gmail.com>

## Licenses

```
├─ MIT: 386
├─ ISC: 32
├─ BSD-3-Clause: 30
├─ Apache-2.0: 11
├─ BSD-2-Clause: 7
├─ CC-BY-4.0: 1
├─ (MIT AND BSD-3-Clause): 1
├─ 0BSD: 1
└─ (MIT OR CC0-1.0): 1
```

## Meta

| Version | Author                                   | Date       |
| ------- | ---------------------------------------- | ---------- |
| 0.0.1   | Kudakwashe Mupeni <kudamupeni@gmail.com> | 20/09/2021 |
| 0.0.2   | Kudakwashe Mupeni <kudamupeni@gmail.com> | 21/09/2021 |
