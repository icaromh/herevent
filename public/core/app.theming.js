(function () {
    'use strict';

    angular
        .module('hereventApp')
        .config(themingConfig);

    themingConfig.$inject = ['$mdThemingProvider'];

    function themingConfig($mdThemingProvider) {
        var customPrimary = {
            '50': '#FCE4EC',
            '100': '#F8BBD0',
            '200': '#F48FB1',
            '300': '#F06292',
            '400': '#EC407A',
            '500': '#E91E63',
            '600': '#D81B60',
            '700': '#C2185B',
            '800': '#AD1457',
            '900': '#880E4F',
            'A100': '#FF80AB',
            'A200': '#FF4081',
            'A400': '#F50057',
            'A700': '#C51162'
        };
        $mdThemingProvider
            .definePalette('customPrimary',
            customPrimary);

        var customAccent = {

            '50': '#FFF3E0',
            '100': '#FFE0B2',
            '200': '#FFCC80',
            '300': '#FFB74D',
            '400': '#FFA726',
            '500': '#FF9800',
            '600': '#FB8C00',
            '700': '#F57C00',
            '800': '#EF6C00',
            '900': '#E65100',
            'A100': '#FFD180',
            'A200': '#FFAB40',
            'A400': '#FF9100',
            'A700': '#FF6D00'
        };
        $mdThemingProvider
            .definePalette('customAccent',
            customAccent);

        var customWarn = {
            '50': '#f1a0a0',
            '100': '#ee8a8a',
            '200': '#eb7474',
            '300': '#e75d5d',
            '400': '#e44747',
            '500': '#e13131',
            '600': '#d92020',
            '700': '#c31c1c',
            '800': '#ac1919',
            '900': '#961616',
            'A100': '#f4b7b7',
            'A200': '#f8cdcd',
            'A400': '#fbe3e3',
            'A700': '#801313'
        };
        $mdThemingProvider
            .definePalette('customWarn',
            customWarn);

        var customBackground = {
            '50': '#ECEFF1',
            '100': '#CFD8DC',
            '200': '#B0BEC5',
            '300': '#90A4AE',
            '400': '#78909C',
            '500': '#607D8B',
            '600': '#546E7A',
            '700': '#455A64',
            '800': '#37474F',
            '900': '#263238',
            'A100': '#FFE57F',
            'A200': '#FFD740',
            'A400': '#FFC400',
            'A700': '#FFAB00'
        };
        $mdThemingProvider
            .definePalette('customBackground',
            customBackground);

        $mdThemingProvider.theme('default')
            .primaryPalette('customPrimary')
            .accentPalette('customAccent')
            .warnPalette('customWarn')
            //.backgroundPalette('customBackground')
    }
})();