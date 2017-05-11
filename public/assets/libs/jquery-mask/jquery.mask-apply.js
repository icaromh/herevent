$(document).ajaxStop(function () {
    reApplyMasks();
});

function reApplyMasks() {
    $.validator.unobtrusive.parse($('form'));

    $('*[data-mask]').each(function () {
        var input = $(this),
            options = {};

        if (input.attr('data-mask-reverse') === 'true') {
            options.reverse = true;
        }

        if (input.attr('data-mask-maxlength') === 'false') {
            options.maxlength = false;
        }
        input.mask(input.attr('data-mask'), options);
    });
}