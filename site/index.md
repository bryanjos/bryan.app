---
layout: layouts/main
pagination:
  data: collections.post
  size: 800
  alias: posts
---

<div>
{%- assign posts = collections.post | reverse -%}
{%- for post in posts -%}
  <div class="post-list-item">
    <h3><a href="{{ post.url | url }}">{{ post.data.title }}</a></h3>
    <time>{{ post.date | date }}</time>
  </div>
{%- endfor -%}
</div>
