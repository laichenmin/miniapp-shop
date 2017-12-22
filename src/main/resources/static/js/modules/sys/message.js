$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/message/list',
        datatype: "json",
        colModel: [			
			{ label: 'id', name: 'id', index: 'id', width: 50, key: true },
			{ label: '标题', name: 'title', index: 'title', width: 80 }, 			
			{ label: '内容', name: 'content', index: 'content', width: 80 }, 	
			{ label: '状态', name: 'status', width: 80, formatter: function(value, options, row){
				return value === 0 ? 
					'<span class="label label-danger">未发布</span>' : 
					'<span class="label label-success">已发布</span>';
			}}, 
			{ label: '创建时间', name: 'createTime', index: 'create_time', width: 80 }, 			
			{ label: '发布时间', name: 'publishTime', index: 'publish_time', width: 80 }			
        ],
		viewrecords: true,
        height: 385,
        rowNum: 10,
		rowList : [10,30,50],
        rownumbers: true, 
        rownumWidth: 25, 
        autowidth:true,
        multiselect: true,
        pager: "#jqGridPager",
        jsonReader : {
            root: "page.list",
            page: "page.currPage",
            total: "page.totalPage",
            records: "page.totalCount"
        },
        prmNames : {
            page:"page", 
            rows:"limit", 
            order: "order"
        },
        gridComplete:function(){
        	//隐藏grid底部滚动条
        	$("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
        }
    });
    vm.initDatepicker();
});

var vm = new Vue({
	el:'#rrapp',
	data:{
		showList: true,
		title: null,
		sysMessage: {
			publishTime:null
		}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.sysMessage = {};
		},
		update: function (event) {
			var id = getSelectedRow();
			if(id == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(id)
		},
		saveOrUpdate: function (event) {
			var url = vm.sysMessage.id == null ? "sys/message/save" : "sys/message/update";
			$.ajax({
				type: "POST",
			    url: baseURL+url,
			    contentType: "application/json",
			    data: JSON.stringify(vm.sysMessage),
			    success: function(r){
			    	if(r.code === 0){
						alert('操作成功', function(index){
							vm.reload();
						});
					}else{
						alert(r.msg);
					}
				}
			});
		},
		del: function (event) {
			var ids = getSelectedRows();
			if(ids == null){
				return ;
			}
			
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url:  baseURL +"sys/message/delete",
				    contentType: "application/json",
				    data: JSON.stringify(ids),
				    success: function(r){
						if(r.code == 0){
							alert('操作成功', function(index){
								$("#jqGrid").trigger("reloadGrid");
							});
						}else{
							alert(r.msg);
						}
					}
				});
			});
		},
		getInfo: function(id){
			$.get(baseURL +"sys/message/info/"+id, function(r){
                vm.sysMessage = r.sysMessage;
            });
		},
        initDatepicker:function(){
          	 $(".datetime-picker").datetimepicker({
          		    minView : "0", //  选择时间时，最小可以选择到那层；默认是‘hour’也可用0表示
          		    language : 'zh-CN', // 语言
          		    minuteStep:30,
          		    autoclose : true, //  true:选择时间后窗口自动关闭
          		    format : 'yyyy-mm-dd hh:ii', // 文本框时间格式，设置为0,最后时间格式为2017-03-23 17:00:00
          		    todayBtn : true, // 如果此值为true 或 "linked"，则在日期时间选择器组件的底部显示一个 "Today" 按钮用以选择当前日期。
          		    startDate : new Date(),  // 窗口可选时间从1970-01-01开始
          		    endDate : new Date("2100-01-01")   // 窗口最大时间直2100-01-01
          		});
          	 	$('#publishTime').datetimepicker().on('hide', function (ev) {
          	 		vm.sysMessage.publishTime =  $("#publishTime").val();
          		});
              
          },	
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
                page:page
            }).trigger("reloadGrid");
		}
	}
});