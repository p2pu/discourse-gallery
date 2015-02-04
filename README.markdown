Embed posts from a discourse forum in a web page.

# Usage

## Configuring discourse for CORS

Add the following to you app.yml

```
  DISCOURSE_ENABLE_CORS: true
  DISCOURSE_CORS_ORIGIN: '*'
```

Then run ./launcher rebuild app.yml

## Add template to your page:

```
<div class="container">
  <div id="gallery" class="gallery-content row">
    <div class="post col-lg-4 col-md-6 col-sm-6">
      <a class="post-link" href="http://example.net" target="_blank"> 
      <div class="container">
        <h2 class="title">Title</h2>
        <img class="profile-image" src="http://placehold.it/50x50">
        <h4 class="author">Author</h4>
        <p class="post-text">Post body text.</p>
      </div> 
      </a> 
    </div>
  </div>
</div>
```

## Include JavaScript

```
<scirpt src="/js/jquery.min.js"></script>
<script src="/js/discourseGallery.js"></script>
<script>
    discourseGallery.loadCategoryGallery({
        containerId: 'gallery', 
        forumUrl: 'forum.example.net',
        category: 'category-slug'
    });
</script>
```
