$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'shop/ordergoods/list',
        datatype: "json",
        colModel: [			
			{ label: 'ordergoodsId', name: 'ordergoodsId', index: 'ORDERGOODS_ID', width: 50, key: true },
			{ label: '订单号', name: 'orderId', index: 'ORDER_ID', width: 80 }, 			
			{ label: '商品id', name: 'goodsId', index: 'GOODS_ID', width: 80 }, 			
			{ label: '价格', name: 'price', index: 'PRICE', width: 80 }, 			
			{ label: '数量', name: 'total', index: 'TOTAL', width: 80 }, 			
			{ label: '规格', name: 'items', index: 'ITEMS', width: 80 }, 			
			{ label: '创建时间', name: 'createTime', index: 'CREATE_TIME', width: 80 }			
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
});

var vm = new Vue({
	el:'#rrapp',
	data:{
		showList: true,
		title: null,
		ordergoods: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.ordergoods = {};
		},
		update: function (event) {
			var ordergoodsId = getSelectedRow();
			if(ordergoodsId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(ordergoodsId)
		},
		saveOrUpdate: function (event) {
			var url = vm.ordergoods.ordergoodsId == null ? "shop/ordergoods/save" : "shop/ordergoods/update";
			$.ajax({
				type: "POST",
			    url: baseURL+url,
			    contentType: "application/json",
			    data: JSON.stringify(vm.ordergoods),
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
			var ordergoodsIds = getSelectedRows();
			if(ordergoodsIds == null){
				return ;
			}
			
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url:  baseURL +"shop/ordergoods/delete",
				    contentType: "application/json",
				    data: JSON.stringify(ordergoodsIds),
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
		getInfo: function(ordergoodsId){
			$.get(baseURL +"shop/ordergoods/info/"+ordergoodsId, function(r){
                vm.ordergoods = r.ordergoods;
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