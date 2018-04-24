var Editor = function($) {
	// 编辑器对象
	var editor,
		config = {
			"uploadImageUrl": "http://pic.zhxing.me/upload",
			"toolBars": ["insertImage","bold","italic","underline"]
		};
//		toolBarHtml = {
//			"insertImage" : '<div class="option"><a href="#" data-role="insertImage">图</a><input type="file" id="img" hidden="hidden" /></div>',
//			"bold" : '<div class="option"><a href="#" data-role="bold">B</a></div>',
//			"italic" :'<div class="option"><a href="#" data-role="italic">I</a></div>',
//			"underline": '<div class="option"><a href="#" data-role="underline">U</a></div>'
//		};

	// 上传图片
	$("a[data-role=insertImage]").click(() => $("#img").click());
	// 加粗
	$("a[data-role=bold]").click(()=> document.execCommand("bold", false));
	// 斜体
	$("a[data-role=italic]").click(()=> document.execCommand("italic", false));
	// 下划线
	$("a[data-role=underline]").click(()=> document.execCommand("underline", false));

	// 上传事件
	$("#img").change(function() {
		var files = this.files;
		var image = files[0];
		var formData = new FormData(); //初始化一个FormData对象
		formData.append("image", image);
		$.ajax({
			url: config.uploadImageUrl,
			type: "POST",
			data: formData,
			processData: false,
			contentType: false,
			success: function(data) {
				console.log(data);
				var code = data.code;
				var msg = data.msg;
				if(code == "") {
					document.execCommand("insertImage", false, msg);
				} else {
					alert(msg);
				}
				return;
			},
			error: function(data) {
				console.log("upload image failed")
			}
		});
	});

	// 键盘监听事件
	$("#content").keyup(function(e) {
		var keyCode = e.keyCode;
		if(keyCode == 8) { // delete
			var html = $(this).html();
			if(html == "") {
				document.execCommand("insertHTML", false,"<p><br></p>");
			}
		}
	});

    // 编辑器可用属性
	return {
		init: function(id, options) {
			// 初始化编辑器
			editor = $("#" + id);
			$.extend(config, options);
		},
		getHtmlContent: function() {
			// 获取编辑器内容
			return editor.children("#content").html();
		},
		getTextContent : function () {
			return editor.children("#content").text();
		}
	};
	
}(window.jQuery);