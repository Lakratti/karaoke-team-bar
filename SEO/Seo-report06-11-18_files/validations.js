let errorStorage      = 0,
    warningStorage    = 0,
    noticeStorage     = 0,
    evaluationStorage = 100,
    requestsStorage   = [];

var validationsArray = [],
    validationsName = [
    'parameterInformation',
    'parameterTitle',
    'parameterDescription',
    'parameterH1H6',
    'parameterContent',
    'parameterCanonicallink',
    'parameterAlternatelink',
    'parameterPagination',
    'parameterIndexation',
    'parameterVulnerability',
    'parameterBot',
    'parameterExternallinks',
    'parameterSubdomainlinks',
    'parameterInternallinks',
    'parameterMobileSpeed',
    'parameterDesktopSpeed',
    'parameterFavicon',
    'parameterImages'
];

let siteUrl; //iframeCheck

const debugMode = false;
const isMtfIframe = window.location.pathname.slice(0,4) === '/mtf';
const host = document.location.host || document.location.hostname;

const loader         = $('.cprogress__loader'),
    circle           = $('.cprogress__circle'),
    percents         = $('.cprogress__percents').children('span'),
    bar              = $('.cprogress__bar'),
    indexBlock       = $('.cprogress-index').children('.indexable'),
    sizeBlock        = $('.cprogress-size').children('.indexable'),
    statusBlock      = $('.cprogress-status').children('.indexable'),
    errors           = $('.cprogress-info--errors').children('span'),
    warnings         = $('.cprogress-info--warnings').children('span'),
    notice           = $('.cprogress-info--notice').children('span'),
    responsesWrapper = $('.responses-wrapper');

const selectedValidations = [1, 2, 3, 4, 5];

const validations = {
    1: {
        name: trans['validations']['names'][1],
        group: {
            'n-0': trans['validations'][0],
            'n-1': trans['validations'][1],
            'n-2': trans['validations'][2],
            'n-3': trans['validations'][3],
            'n-4': trans['validations'][4]
        }
    },
    2: {
        name: trans['validations']['names'][2],
        group: {
            'n-16': trans['validations'][16],
            'n-17': trans['validations'][17]
        }
    },
    3: {
        name: trans['validations']['names'][3],
        group: {
            'n-5': trans['validations'][5],
            'n-6': trans['validations'][6],
            'n-7': trans['validations'][7],
            'n-8': trans['validations'][8],
            'n-9': trans['validations'][9],
            'n-10': trans['validations'][10]
        }
    },
    4: {
        name: trans['validations']['names'][4],
        group: {
            'n-11': trans['validations'][11],
            'n-12': trans['validations'][12],
            'n-13': trans['validations'][13]
        }
    },
    5: {
        name: trans['validations']['names'][5],
        group: {
            'n-14': trans['validations'][14],
            'n-15': trans['validations'][15]
        }
    }
};

function getHostName(url) {
    var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
    if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
        return match[2];
    }
    else {
        return null;
    }
}

let allValidations = 0,
    passedChecks   = 0;

let validationResult = new Map();

$(document).ready(function() {

    allValidations = countValidations();

    $(function(){
        if (getAndCheckQuery()) {
            executeQuery();
        }
    });

    $('#sitechecker_check').click(function(event) {
        //     event.preventDefault();
        //     executeQuery();
        let language = $('html')[0].lang;
        language = '/'+language+'/';
        if(language == '/en/'){
            language = '/';
        }
        let link = window.location.protocol + '//' + window.location.hostname + language + 'seo-report/' + getAndCheckQuery();
        window.location.href = link;
    });

    $('#sitechecker_input').keypress(function(event) {
        let key = event.which;

        if (key === 13) {
            $('#sitechecker_check').click();
        }
    });

});

function checkValidationsCount() {
    if (typeof check_cookie_name !== "undefined") {
        let value = getCookie(check_cookie_name);
        if (!value) {
            value = 1;
        } else {
            value++;
        }

        setCookie(check_cookie_name, value);

        if (value > 1) {
            showValidationMock();
            $('.login__popup-close').click(function () {
                $('.limit_popup').fadeOut();
            });
        }
    }

    return true;
}

function executeQuery() {
    let query = getAndCheckQuery();
    if (!query || selectedValidations.length === 0) {
        return;
    }

    $('.container__results .cloudflare').remove();

    if (!isMtfIframe) {
        changeState('seo-report/' + query);
        resetResults();
    }

    $('.fixed_main').addClass('fixed_main--opened');
    $('#result-container').show();

    setQueryInHtml(query);

    if (checkValidationsCount()) {

        const statusUrl = `${document.location.protocol}//api1.${host}/api/v1/status/${query}`;
        let statusRequest = $.ajax({
            url: statusUrl,
            method: 'GET',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            }
        });

        statusRequest.done(function(response) {
            if (response.url) {
                var SEOURL = encodeURIComponent(getHostName(response.url)),
                    d = document,
                    userLanguage = $('html').attr('lang'),
                    userId = checkData(USERID),
                    userEmail = checkData(USEREMAIL),
                    userLifetimeOrders = checkData(USERLIFETIMEORDERS),
                    userLifetimeValue = checkData(USERLIFETIMEVALUE),
                    userCrawlerDomains = checkData(USERCRAWLERDOMAINS),
                    userMembeshipStatus = checkData(USERMEMBERSHIPSTATUS),
                    userAvaliableURL = checkData(USERAVALIABLEURL),
                    userAvaliableDomains = checkData(USERAVALIABLEDOMAINS);
            }

            function checkData(data){
                if (data === ''){
                    return 'false';
                } else{
                    return data;
                }
            }

            function seoBanner(id, code){
                let script = d.createElement('script');
                script.src='https://t.sitechecker.pro/'+code+'?se_referrer=' + encodeURIComponent(document.referrer) + '&default_keyword=' + encodeURIComponent(document.title) + '&'+window.location.search.replace('?', '&')+'&frm=script&_cid='+id+'&extra_param_1='+SEOURL+'&extra_param_2='+userMembeshipStatus+'&extra_param_3='+userId+'&extra_param_4='+userEmail+'&extra_param_5='+userLifetimeOrders+'&extra_param_6='+userLifetimeValue+'&extra_param_7='+userCrawlerDomains+'&extra_param_8='+userLanguage+'&extra_param_9='+userAvaliableURL+'&extra_param_10='+userAvaliableDomains;
                d.getElementById(id).appendChild(script);
            }
            if (response !== undefined) {
                if ("htmlStatus" in response && response.htmlStatus) {
                    statusBlock.html(response.htmlStatus);
                }

                if ("url" in response && response.url && query !== response.url) {
                    query = response.url;
                    setQueryInHtml(query);
                    changeState('seo-report/' + query);
                }
            }

            if (response === undefined || response.status === undefined || response.status !== 200 || !response.url) {
                renderAbsolutelyFail("htmlStatus" in response && response.htmlStatus);
                if ("error" in response) {
                    renderPageScore('error');
                    renderResponsesNavRow('error', 0, 0, response.error, trans['Error'], false);
                    $('#04fd2e2c-8765-3929-8650-def6b1190264').empty();
                    seoBanner("04fd2e2c-8765-3929-8650-def6b1190264", "dW8MCM");
                    $(window)
                        .scroll(function () {
                            $('.container__left-col').removeClass('container__left-col--sticky');
                            $('.container__left-col').removeClass('container__left-col--bottom-sticked');
                        })
                }
            } else {
                executeAllValidations(query);

                $('#6549adbf-c261-42f4-c374-6092853b8ede').remove();

                $('#result-4').after('<span id="6549adbf-c261-42f4-c374-6092853b8ede"></span>');

                seoBanner("6549adbf-c261-42f4-c374-6092853b8ede", "kZdZsm");
                seoBanner("15a9c402-3417-ff10-c423-b43c99ac9abd", "tv3hhw");
                seoBanner("ad2c00a2-a6ac-b833-3706-3c30e30d292d", "dHG9kY");
                seoBanner("1f8f64e2-5566-4e3d-7beb-61d1ec843215", "HsZCqM");
            }

            addValidationResult('status', response);
            logStatus(response)
        });

        statusRequest.fail(function(jqXHR, textStatus) {
            renderAbsolutelyFail();
        });

    } else {
        resetResults();
    }
}

function addValidationResult(num, response) {
    validationResult.set(num, response);
}

function logStatus(statusRequest) {
    let apiPath = "/wp-admin/admin-ajax.php";

    statusRequest.action = "log_check_request";

    $.ajax({
        url: apiPath,
        type: "POST",
        dataType: "JSON",
        data: statusRequest,
        success: function (data) {
            console.log(data)
        }
    })

}

function executeAllValidations(query) {

    $.each(selectedValidations, function (key, validationsGroupIndex) {

        $.each(validations[validationsGroupIndex]['group'], function (validationIndex, validationName) {

            validationIndex = Number(validationIndex.split('-')[1]);

            renderGroupTitles(validationsGroupIndex, validationIndex, validations[validationsGroupIndex]['name']);
            renderValidationTemplate(validationIndex);

            requestsStorage[validationIndex] = $.ajax({
                url: getDomain(validationIndex) + `/api/v1/full/${validationIndex}/${query}`,
                method: 'GET',
                dataType: 'json',
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                success: function(response){
                    let params = {
                        0: validationsGroupIndex,
                        1: validationIndex,
                        2: query,
                        3: response
                    };

                    ++passedChecks;

                    if (debugMode) {
                        console.log(`check ${passedChecks} of ${allValidations}`);
                    }

                    addValidationResult(validationIndex, response);

                    // hideLoader();
                    // renderResult(params, true);

                    if (allValidations === passedChecks) { // last iteration

                        hideLoader();
                        renderResult(params, true);
                    } else {
                        renderResult(params, true);
                    }
                },
                error: function (jqXHR, textStatus) {
                    renderFail(validationIndex, textStatus, allValidations);
                }
            });
            //
            // requestsStorage[validationIndex].done(function (response) {
            //
            //
            // });
            //
            // requestsStorage[validationIndex].fail();

        });
    });

}

function getFixBlock(message) {
    return $('<div/>',{
        class: 'expand expand-fix'
    }).append(
        $('<div/>', {
            class: 'message hidden',
            html: message
        }),
        $('<a/>', {
            class: 'code--ok',
            html: `${trans['How to fix']} <img src="/assets/images/keyboard-arrow-down.svg">`
        })
    );
}

function getFixBlockHtml(message) {
    return `<div class="expand expand-fix"><div class="message hidden">${message}</div><a class="code--ok">${trans['How to fix']} <img src="/assets/images/keyboard-arrow-down.svg"></a>`;
}

function getShowBlock(message) {
    return $('<div/>',{
        class: 'expand expand-fix'
    }).append(
        $('<div/>', {
            class: 'message hidden',
            html: message
        }),
        $('<span/>', {
            class: 'code--clear',
            html: `${trans['Show more']} <img src="/assets/images/keyboard-arrow-down.svg">`
        })
    );
}

function getShowBlockHtml(message) {
    return `<div class="expand expand-fix"><div class="message hidden">${message}</div><span class="code--clear">${trans['Show more']} <img src="/assets/images/keyboard-arrow-down.svg"></span>`;
}

function renderResult(params, lastIteration = false, miniTool = false) {

    let validationsGroupIndex = params[0],
        validationIndex       = params[1],
        query                 = params[2],
        response              = params[3],
        array                 = response.data.checks,
        evaluation            = response.data.evaluation;


    let mainBlock = $(`#result-${validationIndex}`),
        loadingBlock = mainBlock.children('.loader'),
        resultBlock  = mainBlock.children('.result');

    if (debugMode) {
        console.log(validationIndex, response);
    }

    updateEvaluation(evaluation);

    if (array.length === 0) {
        showErrorBlock(loadingBlock);
        return;
    }

    $.each(array, function(key, obj) {

            let importance = obj.importance,
                subgroup = obj.description ? obj.description : obj.subgroup,
                title = obj.title;

            if(!miniTool) {
                if (validationIndex === 0) {

                    switch (key) {
                        case 0:
                            $('.cprogress-domain')
                                .attr('href', title)
                                .html(title);
                            break;
                        case 2:
                            sizeBlock.html(`<span class="code--${importance}">${title}</span>`);
                            break;
                        case 4:
                            $('.row--cprogress').after(`<div class="cloudflare" style="color:red;font-weight: bold;text-align: center;background-color: #f9f9f9;padding: 10px 0;">${title}</div>`);
                            break;
                    }
                }

                if (validationIndex === 8) {
                    renderIndex(evaluation == 100);
                }
            }
            if (title instanceof Array) {

                switch (validationIndex) {
                    case 16:
                        console.log('image!');
                        if (array[0]['title']) {
                            subgroup += `<br><div id="faviconDiv" class="cprogress__loader cprogress__loader--image"></div>`;
                            let faviconImg = new Image();
                            faviconImg.onload = function () {
                                console.log('onload!');
                                $('#faviconDiv').attr('class', 'active').html(`<img src="${getImagesDomain()}/api/v1/icon/${array[0]['title']}">`);
                            };
                            faviconImg.onerror = function () {
                                console.log('onerror!');
                                $('#faviconDiv').attr('class', 'active').html(`<img src="/assets/images/image_error.png">`);
                            };
                            faviconImg.src = `${getImagesDomain()}/api/v1/icon/${array[0]['title']}`;
                        }

                        title = renderFaviconTable(title, array[1]);
                        if (obj.fix) {
                            title = $('<div/>').append(getFixBlock(obj.fix), title);
                            obj.fix = null;
                        }

                        break;
                    case 17:
                        return;
                    case 2:
                        if (!miniTool) {
                            renderGoogleSnippet(title[0], query);
                        }
                        return;
                    default:
                        title = renderTable(title, validationIndex, subgroup);
                        if (obj.fix) {
                            if (validationIndex == 9 && key == 4 || validationIndex == 7) {
                                title = $('<div/>').append(title, getFixBlock(obj.fix));
                            } else {
                                title = $('<div/>').append(getFixBlock(obj.fix), title);
                            }
                            obj.fix = null;
                        }
                }

            } else if (validationIndex == 17 && array.length == 2) {
                title = `<span class="code--ok">${title}</span>`;
            }


            if(!miniTool) {
                renderPageScore(importance, lastIteration);
            }

                loadingBlock.hide();
                mainBlock.show();
                resultBlock.show();

            if (key === 0) {
                if(!miniTool) {
                    renderSidebarTitle(validationsGroupIndex, validationIndex);
                    renderTitle(resultBlock, validations[validationsGroupIndex]['group'][`n-${validationIndex}`], validationIndex);
                } else if(validationIndex === 18 || validationIndex === 19){
                    let validationIndexFull = validationIndex === 18 ? 15 : 14;
                    renderTitle(resultBlock, validations[validationsGroupIndex]['group'][`n-${validationIndexFull}`], validationIndexFull);
                }
            }

            if (validationIndex === 14 && obj.description == 'screenshot' && obj.title) {
                return renderMobilePreview(obj.title);
            }

            if (validationIndex === 0 && key === 0) {
                return;
            }

            if (validationIndex === 0 && key === 4) {
                return;
            }

            if (validationIndex === 0 && key === 3) {
                return;
            }

            if (validationIndex === 16 && key !== 2) {
                return;
            }

            switch (importance) {
                case 'error':
                case 'warning':
                case 'notice':
                    renderResponsesNavRow(importance, key, validationIndex, title, obj.subgroup, obj.description);
                    renderErrorInSidebar(importance, validationIndex);
            }

        $('<div/>', {
            class: 'result__row',
            style: function() {
                switch (validationIndex) {
                    case 3:
                        if (subgroup === trans['Tables']['CountAllTags']) {
                            return 'padding-bottom: 0; border-bottom: none';
                        } else {
                            return '';
                        }
                    case 6:
                    case 11:
                    case 12:
                    case 13:
                    case 17:
                        return 'flex-wrap: wrap';
                }
            },
            'data-target': '1' + key + validationIndex
        }).append(

            $('<div/>', {
                class: 'result__icon-wrapper',
                style: function() {

                    if (validationIndex === 3 && subgroup === trans['Tables']['DisplayTags'] /*H1-H6*/) {
                        return 'display: none';
                    }

                }
            }).append(
                $('<img/>', {
                    src: `/assets/images/${importance}.svg`,
                    class: `result__icon--${importance}`,
                    alt: importance
                })
            ),

            $('<div/>', {
                class: 'result__title',
                style: function() {
                    if (validationIndex === 3) {
                        if (subgroup === trans['Tables']['DisplayTags']) {
                            return 'display: none';
                        }
                    }
                },
                html: subgroup + (obj.label ? getQuestionIcon(obj.label) : '')
            }),

            $('<div/>', {
                class: function() {
                    switch (validationIndex) {
                        case 3:
                            if (subgroup === trans['Tables']['DisplayTags']) {/*H1-H6*/
                                return `code--${importance} result__content result__content--headers`;
                            } else {
                                return `code--${importance} result__content`;
                            }
                        case 6:
                        case 11:
                        case 12:
                        case 13:
                            if (typeof title !== 'string') {
                                return `code--${importance} result__content result__content--break`;
                            }
                        default:
                            return `code--${importance} result__content`;
                    }
                },
                html: function() {
                    if (obj.fix) {
                        if ((validationIndex == 14 || validationIndex == 15 || validationIndex == 18 || validationIndex == 19) && importance == 'ok') {
                            title += getShowBlockHtml(obj.fix);
                        } else {
                            title += getFixBlockHtml(obj.fix);
                        }
                    }
                    return title;
                }
            }),

            (((validationIndex === 17 && key === 0 && array.length > 1)) ? renderImageTable(array[1].title, array[0]) : '')

        ).appendTo(resultBlock);

        initLabels();
    });

    if (validationIndex === 17) {
        renderImages();
    }
}

function renderValidationTemplate(validationIndex) {
    let idArray = String(validationIndex).split('-'); // google snippet

    let template = $('#result-template')
        .clone()
        .attr('id', `result-${validationIndex}`)
        .show();

    if (idArray.length !== 2) {
        template.appendTo('.container__results');
    } else {
        template.insertAfter(`#result-${idArray[0]}`); // google snippet
    }
}

function renderGoogleSnippet(snippet, query) {

    renderValidationTemplate('2-1');

    let template = $('#result-2-1'),
        result   = template.children('.result'),
        loader   = template.children('.loader'),
        text     = trans['GoogleSnippet']['Fix'];

    let validationIndex = 2.1;

    siteUrl = siteUrl ? siteUrl : query;
    if (siteUrl.slice(0,4) != 'http') {
        siteUrl = 'http://' + siteUrl;
    }

    loader.hide();
    result.show();

    $('<div/>', {
        class: 'container__header',
        html: '<div style="width: 140px; position: relative">' + trans['GoogleSnippet']['Title'] + getQuestionIcon(text) + '</div>',
        'data-target': validationIndex
    }).appendTo(result);

    $('<div/>', {class: 'result__row result__row--snippet'}).append(
        $('<div/>', {class: 'snippet__wrapper'}).append(
            $('<a/>', {
                class: 'snippet__title',
                target: '_blank',
                text: function() {
                    if (snippet.title.length > 70) {
                        return cutStringByWords(snippet.title, 70) + ' ...';
                    } else {
                        return snippet.title;
                    }
                },
                href: siteUrl
            }),
            $('<div/>', {
                class: 'snippet__url',
                text: siteUrl,
            }),
            $('<div/>', {
                class: function() {
                    if (snippet.description) {
                        return 'snippet__description';
                    } else {
                        return 'snippet__description snippet__description--error';
                    }
                },
                text: function() {
                    if (snippet.description) {
                        return cutStringByWords(snippet.description, 154) + ' ...';
                    } else {
                        return trans['GoogleSnippet']['EmptyDescription'];
                    }
                }
            })
        )
    ).appendTo(result);

    function cutStringByWords(snippetString, maxLength) {
        let lastSpaceIndex;

        while (snippetString > maxLength) {
            lastSpaceIndex = snippetString.lastIndexOf(' ');
            snippetString.slice(0, lastSpaceIndex);
        }

        return snippetString;
    }

    let sidebarBlock = $('<div/>', {
        class: 'sidenav__btn sidenav__btn--inner sidenav__btn--opened',
        'data-index': validationIndex,
        text: function() {
            if (debugMode) {
                return validationIndex + ': ' + trans['GoogleSnippet']['Title'];
            } else {
                return trans['GoogleSnippet']['Title'];
            }
        }
    }).appendTo('#sidenav__wrapper-1');

    template.show();

    sidebarBlock
        .hide()
        .slideDown(300);
}

function renderMobilePreview(img) {

    // check for duplicate
    if ($('.mobile-preview-wrapper').length > 0) {
        return;
    }

    let validationIndex = 13.1;

    $('<div/>', {
        class: 'mobile-preview-wrapper',
        'data-target': validationIndex
    }).append(
        $('<div/>', {
            class: 'container__header',
            style: 'margin-bottom: 46px;',
            text: trans['MobilePreview']
        })
    ).prependTo('#result-14');

    $('<div/>', {class: 'mobile-preview'}).append(
        $('<img/>', {
            src: img,
            style: 'width: 320px; height: 568px; border: none;',
        })
    ).appendTo('.mobile-preview-wrapper');

    let sidebarBlock = $('<div/>', {
        class: 'sidenav__btn sidenav__btn--inner sidenav__btn--opened',
        'data-index': validationIndex,
        text: function() {
            if (debugMode) {
                return validationIndex + ': ' + trans['MobilePreview'];
            } else {
                return trans['MobilePreview'];
            }
        }
    }).prependTo('#sidenav__wrapper-5');

    sidebarBlock
        .hide()
        .slideDown(300);
}

function renderTable(titleArray, validationIndex, subgroup) {

    let table = $('<table/>', {
        class: function() {
            if (validationIndex === 3 && subgroup === trans['Tables']['DisplayTags']) {
                return 'results-table headers';
            } else if(validationIndex === 11) {
                return 'results-table external hidden-rows';
            } else if(validationIndex === 13) {
                return 'results-table internal hidden-rows';
            } else {
                return 'results-table';
            }
        }
    });

    renderTableHeaderRow();
    renderTableRows();
    renderShowMoreRow();

    function renderTableHeaderRow() {

        const unlinkIcon = '<img src="/assets/images/unlink.svg" class="icon--unlink">';

        let headers, cell, headerRow = $('<tr/>');

        switch (validationIndex) {
            case 6:
                headers = ['', trans['Tables']['Link'], trans['Tables']['Lang'], trans['Tables']['MH'], trans['Tables']['B'], trans['Tables']['Code']];
                break;
            case 11:
                headers = ['#', trans['Tables']['Qty'], trans['Tables']['Link'], unlinkIcon, trans['Tables']['Anchor'], trans['Tables']['Code']];
                break;
            case 12:
            case 13:
                headers = ['#', trans['Tables']['Qty'], '', trans['Tables']['Link'], unlinkIcon, trans['Tables']['Anchor'], trans['Tables']['Code']];
                break;
            default:
                return;
        }

        $.each(headers, function(key, head) {

            cell = $('<th/>', {
                html: head
            });

            if (validationIndex === 6) {

                if (key !== 0) {
                    $('<div/>', {
                        class: 'info-tooltip',
                        text: 'i',
                        "data-toggle": 'tooltip',
                        title: function() {
                            if (key === 1) {
                                return trans['Tables']['LinkTooltip'];
                            } else if (key === 2) {
                                return trans['Tables']['LangTooltip'];
                            } else if (key === 3) {
                                return trans['Tables']['MHTooltip'];
                            } else if (key === 4) {
                                return trans['Tables']['BTooltip'];
                            } else if (key === 5) {
                                return trans['Tables']['CodeTooltip'];
                            }
                        }
                    }).appendTo(cell);
                }

            } else if(validationIndex === 11) {

                if (key !== 0 && key !== 3) {
                    $('<div/>', {
                        class: 'info-tooltip',
                        text: 'i',
                        "data-toggle": 'tooltip',
                        title: function() {
                            if (key === 1) {
                                return trans['Tables']['QtyTooltip'];
                            } else if (key === 2) {
                                return trans['Tables']['LinkTooltip'];
                            } else if (key === 4) {
                                return trans['Tables']['AnchorTooltip'];
                            } else if (key === 5) {
                                return trans['Tables']['CodeTooltip'];
                            }
                        }
                    }).appendTo(cell);
                }

            } else if(validationIndex === 13) {

                if (key !== 0 && key !== 2 && key !== 4) {
                    $('<div/>', {
                        class: 'info-tooltip',
                        text: 'i',
                        "data-toggle": 'tooltip',
                        title: function() {
                            if (key === 1) {
                                return trans['Tables']['QtyTooltip'];
                            } else if (key === 3) {
                                return trans['Tables']['LinkTooltip'];
                            } else if (key === 5) {
                                return trans['Tables']['AnchorTooltip'];
                            } else if (key === 6) {
                                return trans['Tables']['CodeTooltip'];
                            }
                        }
                    }).appendTo(cell);
                }

            }

            cell.appendTo(headerRow);

        });

        headerRow.appendTo(table);

    }

    function renderTableRows() {

        $.each(titleArray, function (key, array) {

            let row = $('<tr/>'),
                headerSize,
                style;

            if (validationIndex === 3 && subgroup === trans['Tables']['DisplayTags'] /*H1-H6*/) {
                row = $('<tr/>', {class: 'row--hidden'});
            }

            $.each(array, function (key, value) {

                switch (validationIndex) {
                    case 3:
                        switch (subgroup) {
                            case trans['Tables']['CountAllTags']:
                                style = 'padding: 0;';
                                break;
                            case trans['Tables']['DisplayTags']:
                                switch (key) {
                                    case 0:
                                        headerSize = +value.substr(-1, 1);
                                        style = '';
                                        break;
                                    case 1:
                                        headerSize = (headerSize === 1) ? 0 : headerSize;
                                        style = `padding-left: ${15 * headerSize}px;`;
                                }
                                break;
                            default:
                                style = '';
                        }
                        break;
                    case 11:
                        if (key === 5) {
                            style = 'text-align: center;';
                        } else if (key === 2) {
                            style = 'min-width: 160px;';
                        } else {
                            style = '';
                        }
                        break;
                    case 12:
                    case 13:
                        if (key === 3) {
                            style = 'min-width: 160px;';
                        } else {
                            style = '';
                        }
                }

                $('<td/>', {
                    html: value,
                    style: style
                }).appendTo(row);

            });

            row.appendTo(table);
        });
    }

    function renderShowMoreRow() {
        if (validationIndex === 3 && subgroup === trans['Tables']['DisplayTags']) {
            $('<tr/>', {
                class: 'expand-headers'
            }).append(
                $('<td/>', {
                    class: 'code--clear',
                    colspan: 2
                }).append(
                    $('<span/>', {text: trans['Show more']}),
                    $('<img/>', {src: '/assets/images/keyboard-arrow-down.svg'})
                )
            ).appendTo(table);
        } else if(validationIndex === 11 && titleArray.length > 10) {
            $('<tr/>', {
                class: 'expand expand-external'
            }).append(
                $('<td/>', {
                    class: 'code--clear',
                    colspan: 2
                }).append(
                    $('<span/>', {text: trans['Show more']}),
                    $('<img/>', {src: '/assets/images/keyboard-arrow-down.svg'})
                )
            ).appendTo(table);
        } else if(validationIndex === 13 && titleArray.length > 10) {
            $('<tr/>', {
                class: 'expand expand-internal'
            }).append(
                $('<td/>', {
                    class: 'code--clear',
                    colspan: 4
                }).append(
                    $('<span/>', {text: trans['Show more']}),
                    $('<img/>', {src: '/assets/images/keyboard-arrow-down.svg'})
                )
            ).appendTo(table);
        }
    }

    return table;
}

function renderFaviconTable(titleArray, noticeArray) {

    let table = $('<table/>', {
            class: 'results-table favicons hidden-rows',
            style: 'margin-top: 20px'
        }),
        row   = $('<tr/>');

    $('<td/>', {
        style: 'padding-right:5px'
    }).append(
        $('<div/>', {
            class: 'result__icon-wrapper',
            style: 'display:inline-block; margin:0 5px 0 0'
        }).append(
            $('<img/>', {
                src: `/assets/images/${noticeArray.importance}.svg`,
                class: `result__icon--${noticeArray.importance}`,
                alt: noticeArray.importance
            })
        )
    ).appendTo(row);

    $('<td/>').append(
        $('<b/>', {
            html: noticeArray.title
        })
    ).appendTo(row);

    row.appendTo(table);

    $.each(titleArray[0], function(key, array) {

        let row  = $('<tr/>'),
            cell = $('<td/>');

        $('<td/>', {
            html: key,
            style: 'padding-right:5px'
        }).appendTo(row);

        $.each(array, function(key, arr) {
            $('<div/>', {
                style: 'margin-bottom: 3px'
            }).append(

                $('<div/>', {
                    class: 'result__icon-wrapper',
                    style: 'display:inline-block; margin:0 5px 0 0'
                }).append(
                    $('<img/>', {
                        src: `/assets/images/${arr.importance}.svg`,
                        class: `result__icon--${arr.importance}`,
                        alt: arr.importance
                    })
                ),

                $('<span/>', {
                    text: arr.message
                })

            ).appendTo(cell);
        });

        cell.appendTo(row);
        row.appendTo(table);
    });

    if (Object.keys(titleArray[0]).length > 3) {
        $('<tr/>', {
            class: 'expand expand-favicons',
            'data-sort': -1
        }).append(
            $('<td/>', {
                class: 'code--clear',
                colspan: 2
            }).append(
                $('<span/>', {text: trans['Show more']}),
                $('<img/>', {src: '/assets/images/keyboard-arrow-down.svg'})
            )
        ).appendTo(table);
    }

    return table;
}

function renderImageTable(titleArray, messages) {

    let table = $('<table/>', {class: 'results-table images hidden-rows'}),
        row   = $('<tr/>');

    const tableHeads = [
            trans['Tables']['Preview'],
            trans['Tables']['AltAttribute'],
            trans['Tables']['TitleAttribute'],
            trans['Tables']['Size']
        ],
        tableLabels  = [
            trans['Tables']['PreviewTooltip'],
            trans['Tables']['AltAttributeTooltip'],
            trans['Tables']['TitleAttributeTooltip'],
            trans['Tables']['SizeTooltip']
        ],

        errorBlock = $('<span/>', {
            class: 'code--error',
            text: `[ ${trans['empty']} ]`
        });

    $.each(tableHeads, function (key, tableHead) {
        $('<th/>', {text: tableHead}).append(
            $('<div/>', {
                class: 'info-tooltip',
                text: 'i',
                'data-toggle': 'tooltip',
                title: function() {
                    return tableLabels[key];
                }
            })
        ).appendTo(row);
    });

    row.appendTo(table);

    $.each(titleArray, function (key, array) {

        if (array.error) {

            $('<tr/>', {
                class: 'row--images',
                'data-sort': 0
            }).append(
                $('<td/>', {
                    class: 'code--clear'
                }).append(
                    $('<img/>', {src: '/assets/images/image_error.png'})
                ),

                $('<td/>', {
                    class: 'code--clear'
                }).append(
                    array.alt
                        ? array.alt
                        : errorBlock.prop('outerHTML')
                ).append($('<br>')
                ).append($('<span/>', {
                    html: array.error,
                    style: 'color: red'
                })),

                $('<td/>', {
                    class: 'code--clear'
                }).append(
                    array.title
                        ? array.title
                        : errorBlock.prop('outerHTML')
                ),

                $('<td/>', {
                    class: 'code--clear'
                }).append(
                    array.size
                        ? (array.size < 100
                        ? array.size + ' KB'
                        : $('<span/>', {
                            class: 'code--error',
                            text: array.size + ' KB',
                            title: array.label,
                            'data-toggle': function() {
                                return (array.label) ? 'tooltip' : '';
                            }
                        }))
                        : errorBlock.prop('outerHTML')
                )
            ).appendTo(table);

        } else {

            $('<tr/>', {
                class: 'row--images',
                'data-sort': array.size ? array.size : 0
            }).append(

                ((array.originUrl) ?
                        $('<td/>', {
                            'data-alt': array.alt ? array.alt : errorBlock.prop('outerHTML'),
                            'data-title': array.title ? array.title : errorBlock.prop('outerHTML'),
                            'data-size': array.size ? (array.size < 100 ? array.size + ' KB' : $('<span/>', {
                                class: 'code--error',
                                text: array.size + ' KB'
                            })) : errorBlock.prop('outerHTML')
                        }).append(
                            $('<img/>', {
                                src: array.originUrl,
                                title: 'Image from Base64',
                                style: 'max-width: 100px; max-height: 50px; padding-right: 10px'
                            })
                        )
                        :
                        $('<td/>', {
                            'data-image-src': array.originUrl,
                            'data-alt': array.alt ? array.alt : errorBlock.prop('outerHTML'),
                            'data-title': array.title ? array.title : errorBlock.prop('outerHTML'),
                            'data-size': array.size ? (array.size < 100 ? array.size + ' KB' : $('<span/>', {
                                class: 'code--error',
                                text: array.size + ' KB',
                                title: array.label,
                                'data-toggle': function() {
                                    return (array.label) ? 'tooltip' : '';
                                }
                            })) : errorBlock.prop('outerHTML')
                        }).append(
                            $('<div/>', {
                                class: 'cprogress__loader cprogress__loader--image'
                            })
                        )
                ),

                $('<td/>').append(
                    array.alt
                        ? array.alt
                        : errorBlock.prop('outerHTML')
                ),

                $('<td/>').append(
                    array.title
                        ? array.title
                        : errorBlock.prop('outerHTML')
                ),

                $('<td/>').append(
                    array.size
                        ? (array.size < 100
                        ? array.size + ' KB'
                        : $('<span/>', {
                            class: 'code--error',
                            text: array.size + ' KB',
                            title: array.label,
                            'data-toggle': function() {
                                return (array.label) ? 'tooltip' : '';
                            }
                        }))
                        : errorBlock.prop('outerHTML')
                )
            ).appendTo(table);
        }
    });

    if (Object.keys(titleArray).length > 5) {
        $('<tr/>', {
            class: 'expand expand-images',
            'data-sort': -1
        }).append(
            $('<td/>', {
                class: 'code--clear',
                colspan: 4
            }).append(
                $('<span/>', {text: trans['Show more']}),
                $('<img/>', {src: '/assets/images/keyboard-arrow-down.svg'})
            )
        ).appendTo(table);
    }

    let content = '<div class="result__content result__content--break">';

    content += table.prop('outerHTML') + '</div>';

    initFancy();

    return content;
}

function renderImages(){
    $('td[data-image-src]').each(function(index, cell) {

        let $cell   = $(cell),
            src     = $cell.data('image-src'),
            request = $.ajax({
                url: getImagesDomain() + `/api/v1/image/${src}`,
                method: 'GET',
                dataType: 'json'
            });

        request.done(function(response) {

            if (response.data) {
                $cell
                    .empty()
                    .append(
                        $('<a/>', {
                            href: src,
                            rel: 'group',
                            class: 'fancybox'
                        }).append(
                            $('<img/>', {
                                src: response.data,
                                style: 'max-width: 100px; max-height: 50px; padding-right: 10px'
                            })
                        )
                    );
            }

            if (response.error) {
                $cell.parent().attr('data-sort', 0);

                $cell.html(
                    $('<img/>', {
                        src: '/assets/images/image_error.png'
                    })
                );

                $cell.next()
                    .append($('<br>'))
                    .append($('<span/>', {
                            class: 'code--error',
                            text: response.error
                        })
                    );
            }

            $('table.images tr[data-sort]').sortElements(function(a, b){
                return parseInt($(a).attr('data-sort')) < parseInt($(b).attr('data-sort')) ? 1 : -1;
            });

            initFancy();
        });
    });
}

function updateEvaluation(evaluation) {
    evaluationStorage -= (100 - evaluation);

    if (evaluationStorage < 0) {
        evaluationStorage = 0;
    }
}

function renderPageScore(importance, lastIteration = false) {
    switch (importance) {
        case 'error':
            ++errorStorage;
            break;
        case 'warning':
            ++warningStorage;
            break;
        case 'notice':
            ++noticeStorage;
    }

    errors.text(errorStorage);
    warnings.text(warningStorage);
    notice.text(noticeStorage);

    if (lastIteration) {

        let degrees = (evaluationStorage * 1.8) - 180;

        if (evaluationStorage >= 33 && evaluationStorage <= 65) {
            circle
                .removeClass('cprogress__circle--green')
                .addClass('cprogress__circle--orange');
        } else if (evaluationStorage >= 66) {
            circle
                .removeClass('cprogress__circle--orange')
                .addClass('cprogress__circle--green');
        } else {
            circle.removeClass('cprogress__circle--orange cprogress__circle--green');
        }

        percents.text(evaluationStorage);
        bar.rotate(degrees);
    }
}

function renderGroupTitles(validationsGroupIndex, validationIndex, groupName) {
    switch (validationIndex) {
        case 0:
        case 5:
        case 11:
        case 14:
        case 16:
            // main headers
            $('<div/>', {
                class: 'container__group-header',
                'data-target': `h-${validationsGroupIndex}`,
                text: groupName
            }).appendTo('.container__results');

            // sidenav
            $('<div/>', {
                class: 'sidenav__btn sidenav__title sidenav__btn--opened',
                id: `sidenav__title-${validationsGroupIndex}`,
                'data-index': `h-${validationsGroupIndex}`,
                text: groupName
            }).appendTo('.sidenav');

            $('<div/>', {
                id: `sidenav__wrapper-${validationsGroupIndex}`,
                class: 'sidenav__wrapper'
            }).appendTo('.sidenav');
    }
}

function renderTitle(resultBlock, name, validationIndex) {
    $('<div/>', {
        'data-target': validationIndex,
        class: 'container__header',
        text: name
    }).appendTo(resultBlock);
}

function renderSidebarTitle(validationsGroupIndex, validationIndex) {
    let wrapper      = $(`#sidenav__wrapper-${validationsGroupIndex}`),
        parentBlock  = $(`#sidenav__title-${validationsGroupIndex}`),
        titleClass   = 'sidenav__btn sidenav__btn--inner',
        counterClass = `sidenav__counter sidenav__counter-${validationIndex}`;

    if (parentBlock.is('.sidenav__btn--opened')) {
        titleClass += ' sidenav__btn--opened';
    }

    let renderedBlock = $('<div/>', {
        class: titleClass,
        'data-index': validationIndex,
        text: function() {
            if (debugMode) {
                return validationIndex + ': ' + validations[validationsGroupIndex]['group'][`n-${validationIndex}`];
            } else {
                return validations[validationsGroupIndex]['group'][`n-${validationIndex}`];
            }
        }
    }).append(
        $('<div/>', {style: 'margin-right: 23px'}).append(
            $('<span/>', {class: `${counterClass} sidenav__counter--error`, text: 0}),
            $('<span/>', {class: `${counterClass} sidenav__counter--warning`, text: 0}),
            $('<span/>', {class: `${counterClass} sidenav__counter--notice`, text: 0})
        )
    ).appendTo(wrapper);

    sortSidebarTitles();

    renderedBlock
        .hide()
        .slideDown(300);
}

function sortSidebarTitles() {
    let previd, currid;

    $('.sidenav__wrapper').each(function() {

        previd = false;

        $(this).children().each(function() {
            currid = $(this).data('index');

            if (!previd) {
                previd = currid;
            }

            if (currid < previd) {
                $(this).insertBefore(`.sidenav__btn[data-index="${previd}"]`);
            }

            previd = currid;
        });
    });
}

function renderErrorInSidebar(importance, validationIndex) {
    let counter  = $(`.sidenav__counter-${validationIndex}.sidenav__counter--${importance}`),
        quantity = counter.text();

    counter
        .show()
        .text(++quantity);
}

function renderResponsesNavRow(importance, key, validationIndex, title, subgroup, description) {
    let responsesBlock = $(`.responses--${importance}`),
        message;

    responsesWrapper.slideDown(300);
    responsesBlock.slideDown(300);

    if (title instanceof Array || title instanceof Object) {
        message = subgroup + ': ' + description;
    } else {
        message = subgroup + ': ' + title;
    }

    let renderedBlock = $('<div/>', {
        class: 'responses__row',
        'data-index': '1' + key + validationIndex,
        html: message
    }).appendTo(responsesBlock);

    renderedBlock
        .hide()
        .slideDown(300);
}

function countValidations() {
    let count = 0;

    $.each(selectedValidations, function(key, validationsGroupIndex) {
        $.each(validations[validationsGroupIndex]['group'], function() {
            ++count;
        });
    });

    return count;
}

function hideLoader() {
    loader.hide();
    circle.removeClass('cprogress__circle--hidden');
    percents.parent().removeClass('cprogress__percents--hidden');
    bar.removeClass('cprogress__bar--hidden');
    $('.save__pdf').prop('disabled', false);

    let validationString = '';
    let clientID = ga.getAll()[0].get('clientId');

    console.log(validationsArray);
    $.each(validationsName, function( i, val ) {
        $.each(validationsArray, function( index, value ) {
            window.dataLayer[validationsName[value]] = 'false';
            validationString = validationString+"v=1&tid=UA-82230026-1&cid="+clientID+"&t=event&ec="+validationsName[value]+"&ea=false&el="+location.href+"\r\n";
        });
        window.dataLayer[validationsName[i]] = 'true';
        validationString = validationString+"v=1&tid=UA-82230026-1&cid="+clientID+"&t=event&ec="+validationsName[i]+"&ea=true&el="+location.href+"\r\n";
    });
    let statusCode = $('#result-0 .statusHtml').text();

    window.dataLayer.push({
        'statusCode': statusCode
    });

    validationString = validationString+"v=1&tid=UA-82230026-1&cid="+clientID+"&t=event&ec=statusCode&ea="+statusCode+"\r\n";
    $.ajax({
        async: true,
        crossDomain: true,
        url: "https://www.google-analytics.com/batch",
        type: "POST",
        data: validationString,
        success: function (data) {}
    });
}

function showLoader() {
    loader.show();
    circle.addClass('cprogress__circle--hidden');
    percents.parent().addClass('cprogress__percents--hidden');
    bar.addClass('cprogress__bar--hidden');
}

function showErrorBlock(loadingBlock) {
    loadingBlock
        .children('.animated-background')
        .addClass('animated-background--nodata');
}

function renderFail(validationIndex, textStatus, allValidations) {
    console.log(`${validationIndex} validation failed: ${textStatus}`);

    validationsArray.push(validationIndex);

    let mainBlock    = $(`#result-${validationIndex}`),
        loadingBlock = mainBlock.children('.loader');

    showErrorBlock(loadingBlock);

    ++passedChecks;

    if (debugMode) {
        console.log(`${passedChecks}/${allValidations}`);
    }

    if (allValidations === passedChecks) {
        hideLoader();
    }
}

function renderIndex(indexable) {
    if (indexable) {
        indexBlock
            .addClass('indexable--ok')
            .text(trans['Indexable']);
    } else {
        indexBlock
            .addClass('indexable--error')
            .text(trans['Not indexable']);
    }
}

function abortRequest() {
    $.each(requestsStorage, function (index, request) {
        request.abort();
    });
}

function resetResults() {
    let resultBlock   = $('.container__result'),
        headerBlock   = $('.container__group-header'),
        sidebarBlock  = $('.sidenav'),
        responseBlock = $('.responses__row');

    abortRequest();

    resultBlock
        .not('#result-template')
        .remove();

    headerBlock.remove();
    sidebarBlock.empty();
    responseBlock.remove();
    responsesWrapper
        .children('.responses').hide()
        .end()
        .hide();

    showLoader();

    errorStorage      = 0;
    warningStorage    = 0;
    noticeStorage     = 0;
    evaluationStorage = 100;

    passedChecks = 0;

    siteUrl = '';

    indexBlock.html(trans['Waiting']).attr('class', 'indexable');
    sizeBlock.html(trans['Waiting']);
    statusBlock.html(trans['Waiting']);

    errors.text(errorStorage);
    warnings.text(warningStorage);
    notice.text(noticeStorage);

    circle
        .removeClass('cprogress__circle--orange')
        .addClass('cprogress__circle--green');

    percents.text(evaluationStorage);
    bar.rotate(0);
}

function getAndCheckQuery() {
    // return false;
    let query = $('#sitechecker_input').val();

    if (!query || query.length === 0) {
        return;
    }

    return query;
}

function renderAbsolutelyFail(withoutStatus = false) {
    hideLoader();

    circle.removeClass('cprogress__circle--green cprogress__circle--orange');
    percents.text(0);
    bar.rotate(0);

    indexBlock.html(`<span class="code--error">${trans['Error']}</span>`);
    sizeBlock.html(`<span class="code--error">${trans['Error']}</span>`);
    if (!withoutStatus) {
        statusBlock.html(`<span class="code--error">${trans['Error']}</span>`);
    }
}

function setQueryInHtml(query) {
    $('.cprogress-domain')
        .attr('href', query)
        .text(query);
}

function changeState(newState) {
    if (newState.charAt(0) !== '/') {
        newState = `/${newState}`;
    }

    if (locale && locale !== default_locale) {
        newState = `/${locale}${newState}`;
    }

    window.history.replaceState(window.history.state, '', newState);
}

jQuery.fn.rotate = function(degrees) {
    $(this).css({'transform': `rotate(${degrees}deg)`});
    return $(this);
};

function getDomain(num) {
    let result;
    switch (num) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
            result = 'api1.' + host;
            break;
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
            result = 'api2.' + host;
            break;
        case 12:
        case 13:
        case 14:
        case 15:
        case 16:
        case 17:
            result = 'api3.' + host;
            break;
        default:
            result = host;
    }

    return document.location.protocol + '//' + result;
}

function getImagesDomain() {
    return document.location.protocol + '//images.' + host;
}

$('#save__pdf').click(function () {
    const pdfurl = `${document.location.protocol}//api1.${host}/api/v1/export/pdf`;
    const resultText = $('.container__results').html();

    $('#save__pdf').find('i').removeClass('fa-download').addClass('fa-spinner fa-spin');

    function hidePDFLoader(){
        $('#save__pdf').find('i').removeClass('fa-spinner fa-spin').addClass('fa-check');
        setTimeout($('#save__pdf').find('i').removeClass('fa-check').addClass('fa-download'), 5000);
    }

    var data = new FormData();
    data.append('html_for_pdf', resultText);
    fetch(pdfurl, {method: 'post', body: data}).then(r => r.blob()).then(downloadFile).catch(hidePDFLoader);

    function downloadFile(blob) {
        // It is necessary to create a new blob object with mime-type explicitly set
        // otherwise only Chrome works like it should
        var newBlob = new Blob([blob], {type: "application/pdf"});

        // IE doesn't allow using a blob object directly as link href
        // instead it is necessary to use msSaveOrOpenBlob
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(newBlob);
            return;
        }

        // For other browsers:
        // Create a link pointing to the ObjectURL containing the blob.

        var link = document.createElement('a');
        link.style = "display: none";
        var revote = window.URL.createObjectURL(newBlob);
        link.href = revote;
        link.download = "Sitechecker_Report.pdf";
        document.body.appendChild(link);
        link.click();
        setTimeout(function(){
            document.body.removeChild(link);
            window.URL.revokeObjectURL(revote);
        }, 100);
        hidePDFLoader();
    }
});