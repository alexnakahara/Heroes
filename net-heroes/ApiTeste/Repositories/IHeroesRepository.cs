using ApiTeste.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiTeste.Repositories
{
    public interface IHeroesRepository
    {
        Heroes Adicionar(Heroes hero);

        void Alterar(Heroes hero);
        IEnumerable<Heroes> ListarHero();

        Heroes ObterPorId(int id);

        void RemoverHero(Heroes hero);
    }
}
