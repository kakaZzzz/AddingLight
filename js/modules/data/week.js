define(function(require, exports, module){
    exports.week = {
        BPD: {//双顶径
            start: 13,
            end: 40,
            tmpl: '孕{{week}}周',
            data: ['2.52士 0.25', '2.83士0.57', '3.23士0.51', '3.62士0.58', '3.97士0.44', '4.25士0.53', '4.52士0.53', '4.88士0.58', '5.22士0.42', '5.45士0.57', '5.80士0.44', '6.05士0.50', '6.39士0.70', '6.68士0.61', '6.98士0.57', '7.24士O.65', '7.50士0.65', '7.83士0.62', '8.06士0.60', '8.17士0.65', '8.50士0.47', '8.61士0.63', '8.70士0.55', '8.81士0.57', '9.00士0.63', '9.08士0.59', '9.21士0.59', '9.28士0.50']
        },
        
        FL: {//股骨长
            start: 13,
            end: 40,
            tmpl: '孕{{week}}周',
            data: ['1.17士0.31', '1.38士0.48', '1.74士0.58', '2.10士0.51', '2.52士0.44', '2.71士0.46', '3.03士0.50', '3.35士O.47', '3.64士0.40', '3.82士0.47', '4.21士0.41', '4.36士0.51', '4.65士0.42', '4.87士O.41', '5.10士0.41', '5.35士0.55', '5.61士0.44', '5.77士0.47', '6.03士0.38', '6.43士0.49', '6.52士0.46', '6.62士0.43', '6.71士0.45', '6.95士0.47', '7.10士0.52', '7.20士0.43', '7.34士0.53', '7.4士0.53']
        },
        
        AC: {//腹围
            start: 16,
            end: 40,
            tmpl: '孕{{week}}周',
            data: ['10.32士1.92', '11.49士1.62', '12.41士l.89', '13.59士2.30', '14.80士l.89', '15.62士1.84', '16.70士2.23', '17.90士1.85', '18.74士2.23', '19.64士2.20', '21.62士2.30', '21.81士2.12', '22.86士2.41', '23.71士1.50', '24.88士2.03', '25.78士2.32', '26.20士2.33', '27.78:士2.30', '27.99士2.55', '28.74士2.88', '29.44士2.83', '30.14士2017', '30.63士2.83', '31.34士3.12', '31.49士2.79']
        },
        
        HC: {//头围
            start: 12,
            end: 41,
            tmpl: '孕{{week}}周',
            data: ['56', '72', '89', '105', '120', '135', '149', '162', '175', '187', '198', '209', '220', '230', '239', '249', '258', '266', '275', '283', '290', '298', '305', '312', '319', '326', '333', '339', '345', '351']
        }
    }
});