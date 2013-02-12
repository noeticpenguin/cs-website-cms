$(document).ready(function() {
    if(location.href.lastIndexOf('#logined')!=-1){
        $('.nav.hide a,.sidebar li a').each(function() {
            $(this).attr('href',$(this).attr('href')+'#logined')
        })
        $('.logined a[href="27_member_profile-current-user.html"]').attr('href','27_member_profile-current-user.html#logined');
        $('.loginbar-wrapper .container > div').toggleClass('hide');
        $('.nav').toggleClass('hide');
    }

    $('.login-form .btn').click(function() {
        return true;
    });
    $('.btn-logout').click(function() {
        return true;
    });

    $('.modal').on('show', function () {
        if(exist('.modal .jqTransform')) {
            $('.modal').jqTransform();
        }
    });

    if(exist('form.jqTransform')) {
        $('form.jqTransform').jqTransform();
    }

    if(exist('.scrollable')) {
        $('.scrollable').scrollable({circular:true,touch:false}).autoscroll();
    }
    if(exist('.switch')) {
        $('.switch').scrollable({next:'',prev:'',touch:false}).navigator({navi:'.tab'});
    }


    if(exist('.works')) {
        $('.works .icon-large').each(function(i,e) {
            var lr=(i % 2==0)?"left":"right";
            if($(window).width()<=767){
                lr="down";
            }
            $(e).popover({animation:false,html:true,placement:lr,trigger:'manual'}).popover('show');
        });
    }
    if(exist('.banner')) {
        $(".banner .container").hide().show(); // fix layout issue in IE7
    }
	    if(exist('.member-profile')) {
        $(".member-profile .stat .place .count").each(function() {
            var count = $(this);
            count.css("width", 3.3*count.data("count"));
        });
        $(".member-profile .recommend-this-member").click(function() {
            $(this).parent().hide();
            $(".recommendation").show();
        });
    }

    /* about us modal */
    if(exist('#team-member-modal')) {
        $(".team a[href='#team-member-modal']").click(function() {
            var team = $(this).parentsUntil('.team');
            team = $(team[team.length-1]).parent();
            var large = $('.photo', team).data("large");
            var name = $('h2 a', team).text();
            var modal = $("#team-member-modal");
            $(".photo", modal).attr("src", large);
            $("h2 a", modal).text(name);
        });
    }

    /* file upload */
    $('.btn-file input[type=file]').change(function() {
        var filePath = $(this).val().split('\\');
        var fname = filePath[filePath.length - 1];
        if(fname=="") fname="No file chosen";
        $(this).next().text(fname);
    }).hover(function() {
            $(this).prev().toggleClass('hover');
        });


    /**
     *  placeholder
     */
    if(exist(':input[placeholder]')){
        $(":input[placeholder]").placeholder();
    }
	
	String.prototype.trunc =
     function(n,useWordBoundary){
         var toLong = this.length>n,
             s_ = toLong ? this.substr(0,n-1) : this;
         s_ = useWordBoundary && toLong ? s_.substr(0,s_.lastIndexOf(' ')) : s_;
         return  toLong ? s_ + '&hellip;' : s_;
      };
	 
	 if (exist('.challenge')) {
		$('.challenge h3 a').each(function() {
			$(this).html($(this).html().trunc(53, true).toString());
		});
	 }

    //online droplist
//    $('.btn-online').click(function() {
//        $('.online').css({width:$(this).width(),left:$(this).position().left});
//        $('.online .viewport,.online .overview').css({width:$(this).width()-6});
//        $('.online').toggle();
//        $('.online').tinyscrollbar_update();
//        return false;
//    });
//    $(document).on('click',function() {$('.online').hide();}).on('click','.btn-online,.online',function (e) { e.stopPropagation() });
//    $('.online').tinyscrollbar();
});

function exist(el) {
    return $(el).length>0;
}