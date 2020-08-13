using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApiTeste.Models;

namespace ApiTeste.Repositories
{
    public class HeroesRepository : IHeroesRepository
    {
        private readonly List<Heroes> _storage = new List<Heroes>();

        
        public Heroes Adicionar(Heroes hero)
        {
            for (int i = 0; i < _storage.Count; i++)
            {
                if (i == 0)
                {
                    hero.id_hero = _storage[i].id_hero;
                }
                else if (hero.id_hero < _storage[i].id_hero)
                {
                    hero.id_hero = _storage[i].id_hero;
                }
            }
            hero.id_hero++;
            _storage.Add(hero);
            return hero;
        }

        public void Alterar(Heroes hero)
        {
            var index = _storage.FindIndex(x => x.id_hero == hero.id_hero);
            _storage[index] = hero;
        }

        public IEnumerable<Heroes> ListarHero()
        {
            return _storage;
        }

        public Heroes ObterPorId(int id)
        {
            return _storage.FirstOrDefault(x => x.id_hero == id);
        }

        public void RemoverHero(Heroes hero)
        {
            _storage.Remove(hero);
        }
    }
}
