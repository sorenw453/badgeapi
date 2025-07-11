# badgeapi
![Status](https://badgeapi.vercel.app/api/badge?label=API&status=online&color=%2300f000&style=rounded)
![Stars](https://badgeapi.vercel.app/api/github?repo=sorenw453/badgeapi&metric=stars&style=rounded)

An API for generating GitHub Badges to be used in Markdown Files.
## Features
### Static Badges
Specify a color, style, and two pieces of text (label and status).
```md
![Status](https://badgeapi.vercel.app/api/badge?label=Label&status=Status&color=%23ff0000&style=rounded)
```
![Status](https://badgeapi.vercel.app/api/badge?label=Label&status=Status&color=%23ff0000&style=rounded)
### GitHub Badges  
Display GitHub repo stats like stars, issues, PRs, and watchers. Make sure to change the `repo` URL parameter.

```md
![Stars](https://badgeapi.vercel.app/api/github?repo=vercel/next.js&metric=stars&color=%23D4AF37&style=rounded)
```
![Stars](https://badgeapi.vercel.app/api/github?repo=vercel/next.js&metric=stars&color=%23D4AF37&style=rounded)

```md
![PRs](https://badgeapi.vercel.app/api/github?repo=facebook/react&metric=prs&style=pill&color=blue)
```
![PRs](https://badgeapi.vercel.app/api/github?repo=facebook/react&metric=prs&style=rounded&color=blue)

```md
![Issues](https://badgeapi.vercel.app/api/github?repo=nodejs/node&metric=issues&color=%23ff4500&style=rounded)
```
![Issues](https://badgeapi.vercel.app/api/github?repo=nodejs/node&metric=issues&color=%23ff4500&style=rounded)
## Styles
Three different styles are available- flat, rounded, and pill.
```md
![Status](https://badgeapi.vercel.app/api/badge?label=Style&status=Rounded&color=%23ff00f0&style=rounded)
```
![Status](https://badgeapi.vercel.app/api/badge?label=Style&status=Rounded&color=%23ff00f0&style=rounded)
```md
![Status](https://badgeapi.vercel.app/api/badge?label=Style&status=Rounded&color=%23ff00ff&style=flat)
```
![Status](https://badgeapi.vercel.app/api/badge?label=Style&status=Flat&color=%23ff00ff&style=flat)
```md
![Status](https://badgeapi.vercel.app/api/badge?label=Style&status=Rounded&color=%23ff00ff&style=pill)
```
![Status](https://badgeapi.vercel.app/api/badge?label=Style&status=Pill&color=%23ff00ff&style=pill)