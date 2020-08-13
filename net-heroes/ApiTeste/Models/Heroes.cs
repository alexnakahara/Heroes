using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiTeste.Models
{
    public class Heroes
    {
        public int id_hero { get; set; }
        public string tx_nome { get; set; }
        public List<Poder> poderes { get; set; }
    }

    public class Poder
    {
        public int id_poder { get; set; }
        public string tx_poder { get; set; }
        public int id_hero { get; set; }
        public int nu_potencia { get; set; }
        
    }
}
