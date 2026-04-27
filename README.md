# Bubble Wrap Mailing Using MJML

## Prerequisites

- [asdf](https://asdf-vm.com) - asdf is a tool version manager that allows managing multiple runtime versions for different tools.

```console
brew install asdf
```
Or:
  Follow the installation instructions provided in the asdf documentation to install asdf on your system.

## Configuration

### asdf

#### 1. Install asdf plugins

Install the required asdf plugins listed in the '.tool-versions' file located inside the root directory of this repository.

To install the required plugins, run the following command:

<br>
   
```console
asdf plugin add <plugin-name>
```

<br>

Replace `<plugin-name>` with the name of each plugin listed in the '.tool-versions' file. For example:

<br>

```console
asdf plugin add bun https://github.com/cometkim/asdf-bun
```

<br>

#### 2. Install asdf dependencies

To install the project dependencies, run the following command:

<br>

```console
asdf install
```

<br>

> Note:
>
> This command will install all the tools required by the project, with the correct versions specified in the '.tool-versions' file.

<br>

### bun

#### 1. Install dependencies

To install the necessary dependencies, run the following command:

<br>

```console
bun install
```

<br>

## Open the project

To open the folder that contains the MJML project, run the following command in the root directory of the project:

<br>

For using Cursor:
```console
cursor .
```
Or (for using Visual Studio Code):
```console
code .
```

<br>

> Note:
>
> After opening the workspace, Cursor / VS Code will prompt you to install all the recommended extensions for this workspace. You should install them, since these extensions are necessary for the development of this project.
>
> After opening the workspace, Cursor / VS Code will prompt you to use the Typescript version defined by this workspace. You should allow that, to make sure that you are using the same Typescript version as other people working on the project.
