# badgeapi
![Status](https://badgeapi.vercel.app/api/badge?label=API&status=online&color=%2300f000&style=rounded)
![Stars](https://badgeapi.vercel.app/api/github?repo=sorenw453/badgeapi&metric=stars&style=rounded)

An API for generating GitHub Badges to be used in Markdown Files. Renders HTML inside SVGs via `<foreignObject>`, which allows more customization but may not be supported in legacy Environments.
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
### NPM Badges
Display NPM package versions and downloads count. Specify `metric` and `pkg` URL params.
```md
![Version](https://badgeapi.vercel.app/api/npm?metric=version&pkg=react&style=rounded)
```
![Version](https://badgeapi.vercel.app/api/npm?metric=version&pkg=react&style=rounded)
```md
![Version](https://badgeapi.vercel.app/api/npm?metric=downloads&pkg=vercel&style=rounded)
```
![Version](https://badgeapi.vercel.app/api/npm?metric=downloads&pkg=vercel&style=rounded)
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
## Padding
Badge padding can also be customized. Default padding value is 6.
```md
![Status](https://badgeapi.vercel.app/api/badge?label=Padding&status=4&color=%230000ff&style=rounded&padding=4)
```
![Status](https://badgeapi.vercel.app/api/badge?label=Padding&status=4&color=%230000ff&style=rounded&padding=4)
### Example Paddings
![Status](https://badgeapi.vercel.app/api/badge?label=Padding&status=5&color=%230000ff&style=rounded&padding=5)

![Status](https://badgeapi.vercel.app/api/badge?label=Padding&status=6&color=%230000ff&style=rounded&padding=6)

![Status](https://badgeapi.vercel.app/api/badge?label=Padding&status=7&color=%230000ff&style=rounded&padding=7)

![Status](https://badgeapi.vercel.app/api/badge?label=Padding&status=8&color=%230000ff&style=rounded&padding=8)

![Status](https://badgeapi.vercel.app/api/badge?label=Padding&status=10&color=%230000ff&style=rounded&padding=10)

![Status](https://badgeapi.vercel.app/api/badge?label=Padding&status=12&color=%230000ff&style=rounded&padding=12)

![Status](https://badgeapi.vercel.app/api/badge?label=Padding&status=14&color=%230000ff&style=rounded&padding=14)

![Status](https://badgeapi.vercel.app/api/badge?label=Padding&status=20&color=%230000ff&style=rounded&padding=20)
## URL Encoding
The API expects URL-encoded values. This means that to pass hex colors, you will need to encode `#` characters as `%23`, and you will need to encode spaces in the label/status as `%20`.
