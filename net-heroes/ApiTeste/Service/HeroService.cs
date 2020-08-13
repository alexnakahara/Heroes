using ApiTeste.Models;
using System.Collections.Generic;
using System.Linq;
using System.Data.SqlClient;
using Dapper;
using System.Data;

namespace ApiTeste.Service
{
    public class HeroService
    {
        private readonly static List<Heroes> _storage = new List<Heroes>();
        private static string connectionString = ""; // put your string connection(database) 

        public Heroes Adicionar(Heroes hero)
        {
             using (SqlConnection sqlCon = new SqlConnection(connectionString))
            {
                string query = @"insert into nk_tb_heroes
                                (tx_nome, is_deleted) values (@tx_nome, @is_deleted)

                                DECLARE @new_id_hero INT = SCOPE_IDENTITY()
                                SELECT
                                    id_hero,
                                    tx_nome
                                FROM
                                    nk_tb_heroes
                                WHERE
                                    id_hero = @new_id_hero";
                return sqlCon.Query<Heroes>(query, new { hero.tx_nome, is_deleted = 0 }).SingleOrDefault();
            }
           
           
        }

       public Poder AdicionarPoder(Poder poder)
        {
           using (SqlConnection sqlCon = new SqlConnection(connectionString))
               {
               string query = @"insert into ank_tb_poder
                                (tx_poder, id_hero, nu_potencia, is_deleted) values (@tx_poder, @id_hero, @nu_potencia , @is_deleted)

                                DECLARE @new_id_poder INT = SCOPE_IDENTITY()
                                SELECT
                                   id_poder,
                                   tx_poder,
                                    id_poder,
                                    nu_potencia
                                FROM
                                    ank_tb_poder
                                WHERE
                                   id_poder = @new_id_poder";
                return sqlCon.Query<Poder>(query, new { poder.tx_poder, poder.id_hero, poder.nu_potencia, is_deleted = 0 }).SingleOrDefault();
            }


        }

        public Heroes Alterar(Heroes hero)
        {
            using (SqlConnection sqlCon = new SqlConnection(connectionString))
            {
                string query = "Update nk_tb_heroes set tx_nome = @tx_nome where id_hero = @id_hero";
                return sqlCon.Query<Heroes>(query, hero ).SingleOrDefault();               
            }
           
        }
        public Poder AlterarPoder(Poder poder)
        {
            using (SqlConnection sqlCon = new SqlConnection(connectionString))
            {
                string query = "Update ank_tb_poder set tx_poder = @tx_poder, nu_potencia = @nu_potencia where id_poder = @id_poder";
                return sqlCon.Query<Poder>(query, poder).SingleOrDefault();
            }

        }


        public List<Heroes> ListarHero()
        {
            using (SqlConnection sqlCon = new SqlConnection(connectionString))
            {
                return sqlCon.Query<Heroes>("Select * from nk_tb_heroes WHERE is_deleted = 0").ToList();
            }
            
        }

        public List<Poder> ListarPoder(int id_hero)
        {
            using (SqlConnection sqlCon = new SqlConnection(connectionString))
            {
                return sqlCon.Query<Poder>("Select * from ank_tb_poder WHERE id_hero = @id_hero AND is_deleted = 0", new { id_hero }).ToList();
            }

        }
        public Heroes ObterPorId(int id)
        {
            using (SqlConnection sqlCon = new SqlConnection(connectionString))
            {
                string query = @"select * from nk_tb_heroes h
                                left join ank_tb_poder p on h.id_hero = p.id_hero
                                where h.id_hero = @id and h.is_deleted = 0 AND (p.is_deleted = 0 OR p.is_deleted IS NULL);";


                var heroDictionary = new Dictionary<int, Heroes>();
                sqlCon.Query<Heroes, Poder, Heroes>(query, (datahero, datapoder) => {
                    Heroes heroEntry;

                    if (!heroDictionary.TryGetValue(datahero.id_hero, out heroEntry))
                    {
                        heroEntry = datahero;
                        heroEntry.poderes = new List<Poder>();
                        heroDictionary.Add(heroEntry.id_hero, heroEntry);
                    }

                    if (datapoder != null)// Se datapoder for  null ele não adiciona
                    {
                        heroEntry.poderes.Add(datapoder);
                    }
                   
                    return heroEntry;
                }, new { id }, splitOn: "id_poder");

                return heroDictionary[id];
            }
                
        }

        public Poder ObterIdPoder(int id_poder)
        {
            using (SqlConnection sqlCon = new SqlConnection(connectionString))
            {
                string query = @"select * from ank_tb_poder where id_poder = @id_poder";

                return sqlCon.Query<Poder>(query, new { id_poder = id_poder }).SingleOrDefault(); 

            }

        }



        public Heroes RemoverHero(int id_hero)
        {
            using (SqlConnection sqlCon = new SqlConnection(connectionString))
            {
                string query = "UPDATE nk_tb_heroes SET is_deleted = 1 where id_hero = @id_hero";
                return sqlCon.Query<Heroes>(query, new { id_hero = id_hero }).SingleOrDefault();
            }

        }

        public Poder RemoverPoder(int id_poder)
        {
            using (SqlConnection sqlCon = new SqlConnection(connectionString))
            {
                string query = "UPDATE ank_tb_poder SET is_deleted = 1 where id_poder = @id_poder";
                return sqlCon.Query<Poder>(query, new { id_poder = id_poder }).SingleOrDefault();
            }

        }

    }
}
