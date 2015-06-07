(function(){
    var app = angular.module('admin', []);

    app.controller('TabController', function() {
        this.tab = 2;
        this.selectTab = function(setTab) {
            this.tab = setTab;
        }
        this.isSelected = function(checkTab) {
            return this.tab === checkTab;
        }
    });
    
    app.controller('JpmController', function() {
        this.prayers = prayerRequests;
        this.editMode = true;
        this.turnOn = function(){
            this.editMode = true;
        }
        this.turnOff = function(){
            this.editMode = false;
        }
        this.shouldDisplay = function(){
            return this.editMode === false;
        }
    });
    
    app.controller('EditorController', ['$scope', '$sce', function($scope, $sce){
        this.textSrc = "Prayer for the Nations and Missions\nChildren obey your parents.\n1.  We praise God who will give healing. \n2.  Lord establish your army.";
        this.preview = "";
        this.debug = "";
        this.shouldShowInstruction = false;
        this.shouldShowPreview = true;
        var textControlID = "editortextarea";
//        this.convert = function(){
//            var src = this.textSrc;
//            src = src.replace(/\[title\]/g, "<h2>");
//            src = src.replace(/\[\/title\]/g, "</h2>");
//            src = src.replace(/\[content\]/g, "<strong>");
//            src = src.replace(/\[\/content\]/g, "</strong>");
//            alert(src);
//            this.preview = $sce.trustAsHtml(src);
//        };
        
        this.showPreview = function() {
            this.shouldShowPreview = true;
            this.shouldShowInstruction = false;
            var src = $("#" + textControlID).val();
            //set title
            src = src.replace(/\[title\]/g, "<center><h3>");
            src = src.replace(/\[\/title\]/g, "</h3></center><br>");
            
            //set content
            src = src.replace(/\[content\]/g, "<ol>");
            src = src.replace(/\[\/content\]/g, "</ol>");
            src = src.replace(/\[item\]/g, "<li>");
            src = src.replace(/\[\/item\]/g, "</li>");
            
            
            //set scripture
            src = src.replace(/\[scripture\]/g, "<center><i>");
            src = src.replace(/\[\/scripture\]/g, "</i></center><br><br>");
            this.debug = src;
            this.preview = $sce.trustAsHtml(src);
        }
        
        this.showInstruction = function() {
            this.shouldShowInstruction = true;
            this.shouldShowPreview = false;
        }
        
        
        this.addHeader = function(){
            wrapText(textControlID, "[title]");
            this.showPreview();
        }
        
        this.addScripture = function() {
            wrapText(textControlID, "[scripture]")
            this.showPreview();
        }
        
        this.addContent = function(){
//            wrapText(textControlID, "[content]");
            wrapTextWithBreak(textControlID, "[content]");
            this.showPreview();
        }
        
        function wrapTextWithBreak(elementID, openTag) {
            var closeTag = openTag.replace("\[", "\[\/");
            var textArea = $('#' + elementID);
            var len = textArea.val().length;
            var start = textArea[0].selectionStart;
            var end = textArea[0].selectionEnd;
            var selectedText = textArea.val().substring(start, end);
            var list = selectedText.split(/\d+\s*\.*/);
            for(var i = 0; i < list.length; i++) {
                if(list[i] != "" && list[i] != null) {
                    list[i] = list[i].replace("\n", "");
                    list[i] = "  [item]" + list[i] + "[/item]\n" 
                }
            }
            var replacement = openTag + "\n" + list.join("")+ closeTag;
            var newString = textArea.val().substring(0, start) + replacement + textArea.val().substring(end, len)
            textArea.val(newString);
            return newString;
        }
        
        function wrapText(elementID, openTag) {
            //modify close tag
            var closeTag = openTag.replace("\[", "\[\/");
            var textArea = $('#' + elementID);
            var len = textArea.val().length;
            var start = textArea[0].selectionStart;
            var end = textArea[0].selectionEnd;
            var selectedText = textArea.val().substring(start, end);
            var replacement = openTag + selectedText + closeTag;
            var newString = textArea.val().substring(0, start) + replacement + textArea.val().substring(end, len)
            textArea.val(newString);
            return newString;
        }
    }]);
    
    
    app.directive("jpmTab", function() {
        return {
            restrict: 'E',
            templateUrl: 'jym-tab.html',
        };
    });
    
    app.directive("homeTab", function(){
       return {
           restrict: 'E',
           templateUrl: "home-tab.html",
       }; 
    });
    
    app.directive("jymEditor", function(){
        return {
            restrict: 'E',
            templateUrl: 'jym-editor.html',
        };
    })
    
    app.directive('datePicker', function(){
        return {
            restrict: 'A',
            link: function(scope, elm, attrs) {
                $(elm).datepicker();
            },
        };
    });
    
    
    var prayerRequests = [
        {
            category: "JPM",
            title: "Pray for the nation",
            upload_date: "6/15/2015",
            week: "6/15/2015 ~ 6/21/2015",
            status: "Pending",
        },
        {
            category: "JYM",
            title: "Pray for Families",
            upload_date: "6/7/2015",
            week: "6/7/2015 ~ 6/15/2015",
            status: "Published",
        }
    ]

})();