/*
PDFG : CUSTOM JQUERY
*/

function pdfg_htmlEscape(str) {
	return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

jQuery(document).ready(function(){
	jQuery('a.pdfg-print').click(function(){
		jQuery(this).parent('.pdfg-wrap').parent('.pdfg-shortcode').find('.pdfg-form').submit();
	});
});

jQuery(window).load(function()
{
	if(jQuery('.pdfg-shortcode').length > 0)
	{
		jQuery('.pdfg-shortcode').each(function(){
			var clone = jQuery(this).find('.pdfg-content').clone(true);
			jQuery(this).find('.pdfg-html').html(clone);
			
			var html_encodeVal = pdfg_htmlEscape(jQuery(this).find('.pdfg-html').html());
			jQuery(this).find('.pdfg-html').text(html_encodeVal);
		});
	}
});