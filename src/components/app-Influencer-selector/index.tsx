import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { INFLUENCERS_MOCK } from "@/utils/mocks";
import { AppInfluencerListItemSelect } from "../influencer";

const categories = ["Todas", "Youtuber", "Instagramer", "Tiktoker"];

interface InfluencerSelectorProps {
  onSelect: (ids: string[]) => void;
}

export const InfluencerSelector = ({ onSelect }: InfluencerSelectorProps) => {
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [selectedInfluencers, setSelectedInfluencers] = useState<string[]>([]);

  // Simulação de recomendação da IA
  const recommended = INFLUENCERS_MOCK.filter((inf) =>
    ["Instagramer", "Tiktoker"].includes(inf.category)
  );

  const filtered = INFLUENCERS_MOCK.filter((inf) =>
    selectedCategory === "Todas" ? true : inf.category === selectedCategory
  );

  return (
    <div className="w-full max-w-[700px] p-6 bg-white border rounded-2xl">
      <div className="flex flex-col gap-4 mb-4">
        <h2 className="text-xl font-semibold">Selecionar Influenciadores</h2>

        {/* Filtro por categoria */}
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
          <Button
            className="bg-green-800 hover:bg-green-900 cursor-pointer"
            variant="default"
            onClick={() => onSelect(selectedInfluencers)}
          >
            Salvar
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="recommendations" className="w-full">
        {/* <TabsList className="mb-4"> */}
        {/* <TabsTrigger value="recommendations">Indicação da IA</TabsTrigger> */}
        {/* <TabsTrigger value="all">Todos os Influenciadores</TabsTrigger> */}
        {/* </TabsList> */}

        <div className="w-full h-96 overflow-auto rounded-lg border p-2">
          <TabsContent value="recommendations">
            <div className="flex flex-col gap-2">
              {recommended.map((influencer) => (
                <AppInfluencerListItemSelect
                  key={influencer.id}
                  influencer={influencer}
                  checked={selectedInfluencers.includes(influencer.id)}
                  onChange={(id, checked) =>
                    setSelectedInfluencers((state) =>
                      checked ? [...state, id] : state.filter((el) => el !== id)
                    )
                  }
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="all">
            <div className="flex flex-col gap-2">
              {filtered.map((influencer) => (
                <AppInfluencerListItemSelect
                  key={influencer.id}
                  influencer={influencer}
                  checked={selectedInfluencers.includes(influencer.id)}
                  onChange={(id, checked) =>
                    setSelectedInfluencers((state) =>
                      checked ? [...state, id] : state.filter((el) => el !== id)
                    )
                  }
                />
              ))}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
