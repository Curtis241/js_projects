/**
 * Created by cpeterson on 27/05/15.
 */

    window.onload = function() {

        var upButton = document.getElementById("upButton");
        upButton.onclick = Preview.moveUp;

        var downButton = document.getElementById("downButton");
        downButton.onclick = Preview.moveDown;

        Preview.init();
    };

    var Preview = (function(document) {

        var thumbnails = [];

        function findId(value) {
            //Reference: http://stackoverflow.com/questions/8668174/
            // indexof-method-in-an-object-array
            var index = thumbnails.map(
                function(e) {
                    return e.id;
                }
            ).indexOf(parseInt(value));

            return index;
        }

        function Thumbnail(id,imageName,hidden) {
            this.id = id;
            this.imageName = imageName;
            this.hidden = hidden;
        }

        function findImageName(thumbNailId) {
            return thumbnails[findId(thumbNailId)].imageName;
        }

        function setThumbnailHiddenState(thumbNailId,hidden) {
           thumbnails[findId(thumbNailId)].hidden = hidden;
        }

        function thumbnailClickEventHandler(e) {
            console.log("thumbnailClickEventHandler: called");

            var thumbnailImg = e.target;
            var thumbnailName = thumbnailImg.getAttribute("id");
            var imageName = findImageName(thumbnailName);

            var imagePreviewImg = document.getElementById("imageViewer");
            imagePreviewImg.setAttribute("class","previewOverlay");
            imagePreviewImg.setAttribute("src","images/" + imageName + ".jpg");
            imagePreviewImg.setAttribute("data-preview",imageName);
        }


        function init() {
            //Reference: http://stackoverflow.com/questions/19324700/
            // javascript-loop-through-all-the-elements-returned-from-getelementsbytagname
            console.log("init: called");

            var images = document.getElementsByTagName("img");
            images = Array.prototype.slice.call(images);

            images.forEach(function(e) {
                var id = e.getAttribute("id");

                if(e.className == "visible" || e.className == "invisible") {
                    var thumbnail = new Thumbnail(parseInt(id),"image" + id,e.className);
                    thumbnails.push(thumbnail);
                    e.onclick = thumbnailClickEventHandler
                }
            });

            console.log("init: finished loading array");
        }

        function findTopThumbnail() {

            for(var i=0; i<thumbnails.length; i++) {
                var thumbnail = thumbnails[i];
                if(thumbnail.hidden == "visible") {
                    return thumbnail;
                }
            }
        }

        function findBottomThumbnail() {

            for(var i=(thumbnails.length-1); i>0; i--) {
                var thumbnail = thumbnails[i];
                if(thumbnail.hidden == "visible") {
                    return thumbnail;
                }
            }
        }


        function move(f) {

            var bottomThumbnailObj = findBottomThumbnail();
            var topThumbnailObj = findTopThumbnail();

            if(f.isLimitReached(topThumbnailObj.id,bottomThumbnailObj.id)) {
                //console.log("move " + f.direction + ": returned bottom thumbnail: " + JSON.stringify(bottomThumbnailObj));
                //console.log("move " + f.direction + ": returned top thumbnail: " + JSON.stringify(topThumbnailObj));

                var topId = f.getTopId(topThumbnailObj.id);
                var bottomId = f.getBottomId(bottomThumbnailObj.id);

                //console.log("move " + f.direction + ": new bottom index " + bottomId);
                //console.log("move " + f.direction + ": new top index " + topId);

                var topThumbnail = document.getElementById(String(topId));
                topThumbnail.setAttribute("class", f.topVisibleState);
                setThumbnailHiddenState(topId, f.topVisibleState);

                var bottomThumbnail = document.getElementById(String(bottomId));
                bottomThumbnail.setAttribute("class", f.bottomVisibleState);
                setThumbnailHiddenState(bottomId, f.bottomVisibleState);

            } else {
                console.log("move " + f.direction + ": EOL")
            }

        }


        function down() {
            return {
                direction: "down",
                isLimitReached: function(topId,bottomId) {
                    if(parseInt(bottomId) < 13) { return true }
                },
                getTopId: function (id) {
                  return id;
                },
                getBottomId: function (id) {
                    return parseInt(id) + 1;
                },
                topVisibleState: "invisible",
                bottomVisibleState: "visible"
            }
        }

        function up() {
            return {
                direction: "up",
                isLimitReached: function(topId,bottomId) {
                    if(parseInt(topId) > 1) { return true }
                },
                getTopId: function (id) {
                    return parseInt(id) - 1;
                },
                getBottomId: function (id) {
                    return id;
                },
                topVisibleState: "visible",
                bottomVisibleState: "invisible"
            }
        }

        function moveDown() {
            move(down());
        }

        function moveUp() {
            move(up());
        }

        return {
            init: init,
            moveUp: moveUp,
            moveDown: moveDown
        };
    })(document);
