using System;
using ApiTeste.Models;
using Microsoft.AspNetCore.Mvc;
using ApiTeste.Service;

namespace ApiTeste.Controllers
{
    [Route("api/hero")]
    public class HeroesController : Controller
    {
        private readonly HeroService _repositorio;

        public HeroesController(HeroService repositorio)
        {
            _repositorio = repositorio;
        }

        //exibir a lista de poderes
        [HttpGet]
        [Route("list-poder/{id_poder}")]
        public IActionResult ListarPoder(int id_poder)
        {
            return Ok(_repositorio.ListarPoder(id_poder));
        }

        //exibir a lista de herois
        [HttpGet]
        public IActionResult ListarHero()
        {
            return Ok(_repositorio.ListarHero());
        }

        // adicionar um novo heroi
        [HttpPost]
        public IActionResult AdicionarFundo([FromBody] Heroes hero)
        {
            Heroes ret = _repositorio.Adicionar(hero);
            return Ok(ret);
        }

        // adicionar um novo poder
        [HttpPost("adicionarPoder")]
        public IActionResult AdicionarFundo([FromBody] Poder poder)
        {
            Poder ret = _repositorio.AdicionarPoder(poder);
            return Ok(ret);
        }

        [HttpPost("{id}")]
        public IActionResult AlterarHero([FromRoute]int id, [FromBody] Heroes hero, [FromQuery] Guid id2)
        {
            var heroAntigo = _repositorio.ObterPorId(id);
            if (heroAntigo == null)
            {
                return NotFound();
            }
            heroAntigo.tx_nome = hero.tx_nome;

            _repositorio.Alterar(heroAntigo);
            return Ok();
        }

        //atualizar poder ao heroi
        [HttpPost("alterarPoder")]
        public IActionResult AlterarPoder ([FromBody] Poder poder)
        {
            _repositorio.AlterarPoder(poder);
            return Ok();
        }

        [HttpGet("{id_heroes}")]
        public IActionResult GetHero(int id_heroes)

        {
            Heroes heroantigo = _repositorio.ObterPorId(id_heroes);
           
            return Ok(heroantigo);
        }

        //mostrar um poder
        [HttpGet("getPoder/{id_poder}")]
        public IActionResult GetPoder(int id_poder)

        {
            Poder poder = _repositorio.ObterIdPoder(id_poder);

            return Ok(poder);
        }



        //deletar o heroi
        [HttpPost("delete/{id_hero}")]
        public IActionResult RemoverHero(int id_hero)
        {
            _repositorio.RemoverHero(id_hero);
            return Ok();
        }

        //deletar Poder
        [HttpPost("deletePoder/{id_poder}")]
        public IActionResult RemoverPoder(int id_poder)
        {
            _repositorio.RemoverPoder(id_poder);
            return Ok();
        }

    } 


}
