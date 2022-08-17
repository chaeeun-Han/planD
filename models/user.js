// 사용자 정보를 저장하는 모델
// 이메일(아이디), 비밀번호, 이름, 생년월일, 성별, 혈액형, 키, 체중, 진단연도, 당뇨유형, 가족력, 결혼여부, 흡연, 음주
// provider가 local이면 로컬 로그인, kakao면 카카오 로그인
const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            email: {
                type: Sequelize.STRING(40),
                allowNull: false,
                unique: true,
            },
            password: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            name: {
                type: Sequelize.STRING(15),
                allowNull: false,
            },
            birthday: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            gender: {
                type: Sequelize.STRING(4),
                allowNull: false,
            },
            blood_type: {
                type: Sequelize.STRING(4),
                allowNull: true,
            },
            height: {
                type: Sequelize.STRING(4),
                allowNull: true,
            },
            weight: {
                type: Sequelize.STRING(4),
                allowNull: true,
            },
            diagnosis_year: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            diabetes_type: {
                type: Sequelize.STRING(15),
                allowNull: true,
            },
            family_history: {
                type: Sequelize.STRING(4),
                allowNull: true,
            },
            marital_status: {
                type: Sequelize.STRING(4),
                allowNull: true,
            },
            smoking: {
                type: Sequelize.STRING(4),
                allowNull: true,
            },
            drinking:{
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            provider: {
                type: Sequelize.STRING(10),
                allowNull: false,
                defaultValue: 'local',
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'User',
            tableName: 'users',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {}
};