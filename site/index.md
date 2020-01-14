---
layout: layouts/home
pagination:
  data: collections.post
  size: 800
  alias: posts
---

<div>
{%- assign posts = collections.post | reverse -%}
{%- for post in posts -%}
  <article class="h-entry">
    <h3 class="p-name"><a href="{{ post.url | url }}">{{ post.data.title }}</a></h3>
    <p class="metadata">Published by <a class="p-author h-card" href="https://bryan.app">Bryan Joseph</a>
      on <time class="dt-published" datetime="{{date}}">{{ post.date | date }}</time></p>
  </article>
{%- endfor -%}
</div>
