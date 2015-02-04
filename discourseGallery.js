window.discourseGallery = (function($){
    'use strict';

    function getPost(forum_url, post_id, cb){
        var url = forum_url + '/posts/' + post_id + '.json';
        $.getJSON(url, cb);
    }


    function getTopic(forum_url, topic_id, cb){
        var url = forum_url + '/t/' + topic_id + '.json';
        $.getJSON(url, cb);
    }


    function getCategory(forum_url, category, cb){
        var url = forum_url + '/c/' +  category + '/l/latest.json';
        $.getJSON(url, cb);
    }


    function loadTopicGallery(config){
        var container = $('#' + config.containerId);
        var template = $(container.children()[0]).clone();
        container.children().remove();

        getTopic(config.forumUrl, config.topicId, function(topic){
            topic.post_stream.stream.forEach(function(post_id){
                getPost(config.forumUrl, post_id, function(post){
                    console.log(post_id);
                    var clone = template.clone();
                    //clone.find('.title').text('Template title');
                    clone.find('.author').text(post.name);
                    clone.find('.post-link').attr('href', config.forumUrl + '/t/' + post.topic_id + '/' + post.post_number);
                    clone.find('.profile-image').attr('src', config.forumUrl + post.avatar_template.replace('{size}', '45'));
                    clone.find('.post-text').html(post.cooked);
                    container.append(clone);
                });
            });
        });
    }

    
    function loadCategoryGallery(config){
        var container = $('#' + config.containerId);
        var template = $(container.children()[0]).clone();
        container.children().remove();

        getCategory(config.forumUrl, config.category, function(category){
            // TODO add button and callback to load more
            category.topic_list.topics.forEach(function(topic){
                var url = config.forumUrl + '/t/' + topic.id + '/1.json'
                $.getJSON(url, function(topic){
                    //console.log(post_id);
                    var post = topic.post_stream.posts[0];
                    var clone = template.clone();
                    clone.find('.title').text(topic.title);
                    clone.find('.author').text(post.name);
                    clone.find('.post-link').attr('href', config.forumUrl + '/t/' + post.topic_id + '/' + post.post_number);
                    clone.find('.profile-image').attr('src', config.forumUrl + post.avatar_template.replace('{size}', '45'));
                    clone.find('.post-text').html(post.cooked);
                    container.append(clone);
                });
            });
        });
    }

    return {
        loadTopicGallery: loadTopicGallery,
        loadCategoryGallery: loadCategoryGallery
    }

})(jQuery, window.discourse);
