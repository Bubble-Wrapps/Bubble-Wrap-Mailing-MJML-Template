# Bubble Wrap Mailing Using MJML

The MJML (Mailjet Markup Language) project starter.

## Usage

This template is free to use in personal and commercial projects.

However, it is not intended to be:
- Resold as a template
- Repackaged as a competing developer product
- Distributed under another name as a template

If you’re unsure whether your use case is okay, feel free to ask or open an issue.

<br>

# Setup

## Prerequisites

- [asdf](https://asdf-vm.com) - asdf is a tool version manager that allows managing multiple runtime versions for different tools.

<br>

```console
brew install asdf
```

>Or:
>
>Follow the installation instructions provided in the asdf documentation to install asdf on your system.

<br>

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

### Bun

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

<br>

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

<br>

## Build and start working

Run:
<br>

```console
bun run build
```
> Note:
>
> This will compile your .mjml files into .html (and output them into the dist folder).
>
> This step is necessary for the Preview in the next step to work properly - as hello.mjml contains a component inclusion as compiled html through the mj-include component. (this should be easier to grasp on after you read about the Architecture below and scan through the [MJML documentation](https://documentation.mjml.io/#mjml-guide))

<br>

Then open hello.mjml, hit Cmd/Ctrl + Shift + P and run 'MJML: Open Preview to the Side', which should open an MJML Preview tab (though not necessarily to the Side - you can drag it there though though).
