SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ank_tb_poder](
	[id_poder] [int] IDENTITY(1,1) NOT NULL,
	[tx_poder] [varchar](100) NOT NULL,
	[id_hero] [int] NOT NULL,
	[nu_potencia] [int] NOT NULL,
	[is_deleted] [bit] NOT NULL,
 CONSTRAINT [PK_ank_tb_poder] PRIMARY KEY CLUSTERED 
(
	[id_poder] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[ank_tb_poder] ADD  CONSTRAINT [DF_ank_tb_poder_is_deleted]  DEFAULT ((0)) FOR [is_deleted]
GO



SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[nk_tb_heroes](
	[id_hero] [int] IDENTITY(1,1) NOT NULL,
	[tx_nome] [varchar](50) NULL,
	[is_deleted] [bit] NOT NULL
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[nk_tb_heroes] ADD  CONSTRAINT [DF_nk_tb_heroes_is_deleted]  DEFAULT ((0)) FOR [is_deleted]
GO
