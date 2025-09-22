/**
 * College API Service
 * Connects to web backend's /api/colleges endpoint
 */

import apiClient from '@/utils/api';
import { College, CollegeDetail, ApiResponse, FilterOptions } from '@/types/colleges';

export class CollegeApiService {
  /**
   * Fetch colleges with filters
   */
  static async getColleges(filters: Partial<FilterOptions> = {}): Promise<ApiResponse> {
    try {
      // For now, use static data until backend is fully connected
      // TODO: Replace with actual API call when backend is ready
      const { staticColleges } = await import('@/types/colleges');
      
      // Convert detailed colleges to basic college format
      let colleges: College[] = staticColleges.map(college => ({
        id: college.id,
        name: college.name,
        location: college.location,
        city: college.city,
        state: college.state,
        type: college.type,
        rating: college.reviews.overallRating.toString(),
        cutoff: college.cutoffs[0]?.open.toString() || 'N/A',
        placement: college.placements.averagePackage,
        naacGrade: college.naacGrade,
        fees: '₹2-8 LPA', // Default fees range
        programs: [
          ...college.programs.undergraduate.map(p => p.name),
          ...college.programs.postgraduate.map(p => p.name)
        ],
        facilities: college.facilities.map(f => f.name),
        description: college.description,
        establishedYear: college.establishedYear,
        affiliation: college.affiliation,
        website: college.contact.website
      }));

      // Apply filters
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        colleges = colleges.filter(college => 
          college.name.toLowerCase().includes(searchLower) ||
          college.city.toLowerCase().includes(searchLower) ||
          college.state.toLowerCase().includes(searchLower) ||
          college.programs.some(program => program.toLowerCase().includes(searchLower))
        );
      }

      if (filters.selectedType && filters.selectedType !== 'all') {
        colleges = colleges.filter(college => college.type === filters.selectedType);
      }

      if (filters.selectedState && filters.selectedState !== 'all') {
        colleges = colleges.filter(college => college.state === filters.selectedState);
      }

      if (filters.selectedProgram && filters.selectedProgram !== 'all') {
        colleges = colleges.filter(college => {
          const programLower = filters.selectedProgram!.toLowerCase();
          return college.programs.some(program => {
            const progLower = program.toLowerCase();
            // Match by program type/field
            if (programLower === 'engineering') {
              return progLower.includes('b.tech') || progLower.includes('b.e.') || progLower.includes('m.tech');
            }
            if (programLower === 'medical') {
              return progLower.includes('mbbs') || progLower.includes('bds') || progLower.includes('md') || progLower.includes('ms') || progLower.includes('nursing');
            }
            if (programLower === 'management') {
              return progLower.includes('mba') || progLower.includes('bba') || progLower.includes('pgpm') || progLower.includes('management');
            }
            if (programLower === 'law') {
              return progLower.includes('ll.b') || progLower.includes('ll.m') || progLower.includes('law');
            }
            if (programLower === 'arts & science') {
              return progLower.includes('b.a.') || progLower.includes('b.sc') || progLower.includes('b.com') || progLower.includes('economics') || progLower.includes('physics') || progLower.includes('english') || progLower.includes('psychology');
            }
            if (programLower === 'design') {
              return progLower.includes('design') || progLower.includes('b.des') || progLower.includes('m.des') || progLower.includes('fashion');
            }
            if (programLower === 'statistics') {
              return progLower.includes('stat') || progLower.includes('math') || progLower.includes('b.stat') || progLower.includes('m.stat');
            }
            // Fallback to partial match
            return progLower.includes(programLower);
          });
        });
      }

      return {
        success: true,
        data: colleges,
        total: staticColleges.length,
        filtered: colleges.length,
        message: 'Colleges fetched successfully'
      };
    } catch (error) {
      console.error('Error fetching colleges:', error);
      throw new Error('Failed to fetch colleges. Please check your connection.');
    }
  }

  /**
   * Get college detail by ID
   */
  static async getCollegeDetail(collegeId: string): Promise<CollegeDetail> {
    try {
      // For now, we'll use the static data since the web app uses mock data
      // In production, this would be an API call
      const { staticColleges } = await import('@/types/colleges');
      const college = staticColleges.find(c => c.id === collegeId);
      
      if (!college) {
        throw new Error('College not found');
      }
      
      return college;
    } catch (error) {
      console.error('Error fetching college detail:', error);
      throw new Error('Failed to fetch college details.');
    }
  }

  /**
   * Search colleges by query
   */
  static async searchColleges(query: string): Promise<College[]> {
    try {
      const response = await this.getColleges({ searchTerm: query });
      return response.data;
    } catch (error) {
      console.error('Error searching colleges:', error);
      return [];
    }
  }

  /**
   * Get colleges by type
   */
  static async getCollegesByType(type: string): Promise<College[]> {
    try {
      const response = await this.getColleges({ selectedType: type });
      return response.data;
    } catch (error) {
      console.error('Error fetching colleges by type:', error);
      return [];
    }
  }

  /**
   * Get colleges by state
   */
  static async getCollegesByState(state: string): Promise<College[]> {
    try {
      const response = await this.getColleges({ selectedState: state });
      return response.data;
    } catch (error) {
      console.error('Error fetching colleges by state:', error);
      return [];
    }
  }
}