import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type AIInsight = Database['public']['Tables']['ai_insights']['Row'];

export const useAIInsights = (userId?: string) => {
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  const fetchInsights = async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('ai_insights')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(5);

      if (!error && data) {
        setInsights(data);
      }
    } catch (error) {
      console.error('Error fetching AI insights:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateInsights = async () => {
    if (!userId || generating) return;

    setGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-ai-insights');
      
      if (error) throw error;
      
      // Refresh insights after generation
      await fetchInsights();
    } catch (error) {
      console.error('Error generating AI insights:', error);
    } finally {
      setGenerating(false);
    }
  };

  const markAsRead = async (insightId: string) => {
    try {
      await supabase
        .from('ai_insights')
        .update({ is_read: true })
        .eq('id', insightId);
      
      setInsights(prev => 
        prev.map(insight => 
          insight.id === insightId ? { ...insight, is_read: true } : insight
        )
      );
    } catch (error) {
      console.error('Error marking insight as read:', error);
    }
  };

  useEffect(() => {
    fetchInsights();

    // Set up real-time subscription
    const channel = supabase
      .channel('ai-insights-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'ai_insights',
          filter: `user_id=eq.${userId}`
        },
        () => {
          fetchInsights();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  return { insights, loading, generating, generateInsights, markAsRead };
};
