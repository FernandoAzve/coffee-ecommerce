from flask import jsonify, request
from flask_restful import Resource
from app.model.AdminModel import Admin
from app import db

class GetAdm(Resource):
    def get(self):
        try:
            adms = Admin.query.all()
            if not adms:
                return {'message': 'Nenhum administrador encontrado.'}, 404
            
            adm_dict = [adm.to_dict() for adm in adms]
            
            return adm_dict, 200
        except Exception as e:
            return {'error': f'Ocorreu um erro ao buscar os administradores: {str(e)}'}, 500

class DeleteAdm(Resource):
    def delete(self, adm_id):
        try:
            adm = Admin.query.get(adm_id)
            if not adm:
                return {'error': 'Administrador não encontrado.'}, 404
            
            db.session.delete(adm)
            db.session.commit()
            
            return {'message': 'Administrador deletado com sucesso.'}, 200
        except Exception as e:
            return {'error': f'Ocorreu um erro ao deletar o administrador: {str(e)}'}, 500