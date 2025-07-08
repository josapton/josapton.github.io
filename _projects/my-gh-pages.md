---
layout: post
title: Joko Saptono's GitHub Pages
description: josapton.github.io source code
---

# [josapton.github.io](https://josapton.github.io/)

Source code of josapton.github.io website. Powered by [Jekyll](https://jekyllrb.com/) and [Gradfolio](https://github.com/jitinnair1/gradfolio).

## Preview

<summary>Light</summary>
<img src="https://github.com/josapton/josapton.github.io/blob/main/light.png" alt="Preview of josapton.github.io in light mode"/>
<summary>Dark</summary>
<img src="https://github.com/josapton/josapton.github.io/blob/main/dark.png" alt="Preview of josapton.github.io in dark mode"/>

## Features

- Responsive
- Respects Dark Mode preference set by the user
- [Projects](https://josapton.github.io/projects) Page to showcase works/side projects
- [Blog Page](https://josapton.github.io/blog) to share informations and knowledges
- Link to profiles on LinkedIn, GitHub, and socials

## Documentation

Check out the [Jekyll docs](https://jekyllrb.com/docs/) and [Gradfolio wiki](https://github.com/jitinnair1/gradfolio/wiki) for more information about creating a website with Jekyll and Gradfolio.

### Installation

- Go to https://github.com/jitinnair1/gradfolio and click on `Use this template`
- Name the repository ***username***.github.io
- Locate `pages.yml` in `.github/workflows` and add write permissions after the name:
```yaml
name: Build and Deploy to Github Pages

permissions:
    contents: write

on:
    push:
        branches:
            - master
...
```
- Edit `baseurl` and `url` in the `_config.yml` file to:
```yaml
baseurl: ""
url: "https://***username***.github.io"
```
- Modify the contents and personalise the template
- The new site should be ready at `https://***username***.github.io/`

or

- Install [Ruby+Devkit](https://www.ruby-lang.org/en/downloads/)
- Install Jekyll and Bundler using `gem install jekyll bundler`
- Clone the repository `git clone https://github.com/jitinnair1/gradfolio ***username***.github.io`
>- `cd ***username***.github.io`
>- `code .`
- Locate `pages.yml` in `.github/workflows` and add write permissions after the name:
```yaml
name: Build and Deploy to Github Pages

permissions:
    contents: write

on:
    push:
        branches:
            - master
...
```
- Edit `baseurl` and `url` in the `_config.yml` file to:
```yaml
baseurl: ""
url: "https://***username***.github.io"
```
- `bundle install`
- `bundle exec jekyll serve --force-polling --trace`
- Modify the contents and personalise the template
- create a new public repository named ***username***.github.io
>- git add .
>- git commit -m 'Initial GitHub pages site with Jekyll'
>- git remote add origin https://github.com/***username***/***username***.github.io.git
>- git push -u origin master
- The new site should be ready at `https://***username***.github.io/`

### External

- [**Ruby**](https://www.ruby-lang.org/en/) is...
A dynamic, open source programming language with a focus on simplicity and productivity. It has an elegant syntax that is natural to read and easy to write.
- [**Jekyll**](https://jekyllrb.com/)
Jekyll is a simple, blog-aware, static site generator perfect for personal, project, or organization sites. Think of it like a file-based CMS, without all the complexity. Jekyll takes your content, renders Markdown and Liquid templates, and spits out a complete, static website ready to be served by Apache, Nginx or another web server. Jekyll is the engine behind GitHub Pages, which you can use to host sites right from your GitHub repositories.
- [**Gradfolio**](https://github.com/jitinnair1/gradfolio)
Responsive, dark-mode ready Jekyll theme designed for use as a personal website and portfolio.

## About Me

I am a student and lazy programmer who thrives on balancing productivity with relaxation. While I have a laid-back demeanor, I’m committed to honing my skills and making meaningful contributions in the tech world. [Email](mailto:josapton@gmail.com), [LinkeIn](https://www.linkedin.com/in/jokosaptono), [Facebook](https://www.facebook.com/josapton), [Instagram](https://www.instagram.com/josapton).