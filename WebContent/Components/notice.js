$(document).ready(function() 
{  
		$("#alertSuccess").hide();  
	    $("#alertError").hide(); 
}); 
 
 
// SAVE ============================================ 
$(document).on("click", "#btnSave", function(event) 
{  
	// Clear alerts---------------------  
	$("#alertSuccess").text("");  
	$("#alertSuccess").hide();  
	$("#alertError").text("");  
	$("#alertError").hide(); 
 
	// Form validation-------------------  
	var status = validateNoticeForm();  
	if (status != true)  
	{   
		$("#alertError").text(status);   
		$("#alertError").show();   
		return;  
	} 
 
	// If valid------------------------  
	var type = ($("#hidnoticeIdSave").val() == "") ? "POST" : "PUT"; 

	$.ajax( 
	{  
			url : "NoticeAPI",   
			type : type,  
			data : $("#formNotice").serialize(),  
			dataType : "text",  
			complete : function(response, status)  
			{   
				onNoticeSaveComplete(response.responseText, status);  
			} 
	}); 
}); 


function onNoticeSaveComplete(response, status) 
{  
	if (status == "success")  
	{   
		var resultSet = JSON.parse(response); 

		if (resultSet.status.trim() == "success")   
		{    
			$("#alertSuccess").text("Successfully saved.");    
			$("#alertSuccess").show(); 

			$("#divNoticeGrid").html(resultSet.data);   
		} else if (resultSet.status.trim() == "error")   
		{    
			$("#alertError").text(resultSet.data);    
			$("#alertError").show();   
		} 

	} else if (status == "error")  
	{   
		$("#alertError").text("Error while saving.");   
		$("#alertError").show();  
	} else  
	{   
		$("#alertError").text("Unknown error while saving..");   
		$("#alertError").show();  
	} 

	$("#hidnoticeIdSave").val("");  
	$("#formNotice")[0].reset(); 
} 

 
// UPDATE========================================== 
$(document).on("click", ".btnUpdate", function(event) 
{     
	$("#hidnoticeIdSave").val($(this).closest("tr").find('#hidnoticeIdUpdate').val());     
	$("#noticeDate").val($(this).closest("tr").find('td:eq(0)').text());     
	$("#noticeTitle").val($(this).closest("tr").find('td:eq(1)').text()); 
	$("#noticeArea").val($(this).closest("tr").find('td:eq(2)').text());
	$("#noticeDesc").val($(this).closest("tr").find('td:eq(3)').text()); 
}); 




//REMOVE===========================================
$(document).on("click", ".btnRemove", function(event) 
{  
	$.ajax(  
	{   
		url : "NoticeAPI",   
		type : "DELETE",   
		data : "noticeId=" + $(this).data("NoticeID"),   
		dataType : "text",   
		complete : function(response, status)   
		{    
			onNoticeDeleteComplete(response.responseText, status);   
		}  
	}); 
}); 

function onNoticeDeleteComplete(response, status) 
{  
	if (status == "success")  
	{   
		var resultSet = JSON.parse(response); 

		if (resultSet.status.trim() == "success")   
		{    
			
			$("#alertSuccess").text("Successfully deleted.");    
			$("#alertSuccess").show(); 
		
			$("#divNoticeGrid").html(resultSet.data); 
			
		} else if (resultSet.status.trim() == "error")   
		{    
			$("#alertError").text(resultSet.data);    
			$("#alertError").show();   
		}
		

	} else if (status == "error")  
	{   
		$("#alertError").text("Error while deleting.");   
		$("#alertError").show();  
	} else  
	{   
		$("#alertError").text("Unknown error while deleting..");   
		$("#alertError").show();  
	}
}
 
// CLIENT-MODEL========================================================================= 
function validateNoticeForm() 
{  
	// DATE-------------------------------
	if ($("#noticeDate").val().trim() == "")  
	{   
		return "Insert Date.";  
	}
	
	// REASON
	if ($("#noticeTitle").val().trim() == "")
	{
	return "Insert Notice Reason.";
	}
	
	// AREAS
	if ($("#noticeArea").val().trim() == "")
	{
	return "Insert the affected areas.";
	}
	
	// DESCRIPTION
	if ($("#noticeDesc").val().trim() == "")
	{
	return "Insert a description.";
	}
	

	return true; 
}