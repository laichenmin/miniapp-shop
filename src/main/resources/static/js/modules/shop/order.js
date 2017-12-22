$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'shop/order/list',
        datatype: "json",
        colModel: [			
			{ label: 'orderId', name: 'orderId', index: 'ORDER_ID', width: 50, key: true },
			{ label: '项目ID', name: 'projectId', index: 'PROJECT_ID', width: 80 }, 			
			{ label: '支付状态', name: 'status', index: 'STATUS', width: 80 }, 			
			{ label: 'openid', name: 'openid', index: 'OPENID', width: 80 }, 			
			{ label: '项目名称', name: 'projectName', index: 'PROJECT_NAME', width: 80 }, 			
			{ label: '价格', name: 'price', index: 'PRICE', width: 80 }, 			
			{ label: '原价格', name: 'costprice', index: 'COSTPRICE', width: 80 }, 			
			{ label: '商品价格', name: 'goodsprice', index: 'GOODSPRICE', width: 80 }, 			
			{ label: '打折抵扣', name: 'discount', index: 'DISCOUNT', width: 80 }, 			
			{ label: '体验金抵扣', name: 'discounttestmoney', index: 'DISCOUNTTESTMONEY', width: 80 }, 			
			{ label: '创建时间', name: 'createTime', index: 'CREATE_TIME', width: 80 }, 			
			{ label: '结束时间', name: 'fintime', index: 'FINTIME', width: 80 }, 			
			{ label: '用户id', name: 'uid', index: 'UID', width: 80 }, 			
			{ label: '支付状态', name: 'tradeState', index: 'TRADE_STATE', width: 80 }, 			
			{ label: '订单类型（shop表示商城，recharge表示充值，project表示购买专家课程,reward表示签到奖励,transfer表示转账）', name: 'type', index: 'TYPE', width: 80 }, 			
			{ label: '专家名称', name: 'expertName', index: 'EXPERT_NAME', width: 80 }, 			
			{ label: '订单号', name: 'outTradeNo', index: 'OUT_TRADE_NO', width: 80 }, 			
			{ label: '评分', name: 'score', index: 'SCORE', width: 80 }, 			
			{ label: '评价', name: 'msg', index: 'MSG', width: 80 }, 			
			{ label: '评价时间', name: 'scoreTime', index: 'SCORE_TIME', width: 80 }, 			
			{ label: '支付方式', name: 'payType', index: 'PAY_TYPE', width: 80 }, 			
			{ label: '快递单号', name: 'expressId', index: 'EXPRESS_ID', width: 80 }, 			
			{ label: '快递公司', name: 'expressCompany', index: 'EXPRESS_COMPANY', width: 80 }, 			
			{ label: '地址', name: 'adress', index: 'ADRESS', width: 80 }, 			
			{ label: '备注', name: 'remark', index: 'REMARK', width: 80 }, 			
			{ label: '邮费', name: 'expressFee', index: 'EXPRESS_FEE', width: 80 }, 			
			{ label: '购物车id', name: 'cartIds', index: 'CART_IDS', width: 80 }, 			
			{ label: '交易类型-收入支出', name: 'transactionType', index: 'TRANSACTION_TYPE', width: 80 }, 			
			{ label: '店铺id', name: 'storeId', index: 'store_id', width: 80 }			
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
		order: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.order = {};
		},
		update: function (event) {
			var orderId = getSelectedRow();
			if(orderId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(orderId)
		},
		saveOrUpdate: function (event) {
			var url = vm.order.orderId == null ? "shop/order/save" : "shop/order/update";
			$.ajax({
				type: "POST",
			    url: baseURL+url,
			    contentType: "application/json",
			    data: JSON.stringify(vm.order),
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
			var orderIds = getSelectedRows();
			if(orderIds == null){
				return ;
			}
			
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url:  baseURL +"shop/order/delete",
				    contentType: "application/json",
				    data: JSON.stringify(orderIds),
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
		getInfo: function(orderId){
			$.get(baseURL +"shop/order/info/"+orderId, function(r){
                vm.order = r.order;
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